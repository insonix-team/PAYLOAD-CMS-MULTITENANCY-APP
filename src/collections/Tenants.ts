import crypto from 'crypto';
import { COLOR_OPTIONS, FONT_FAMILY_OPTIONS, ROLES } from '@/constants/AppOptions';
import { CollectionConfig } from 'payload';
import { superAdminAccess, tenantAccess } from '@/lib/utils';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

const GA_FIELDS = [
  'smtpPassword',
  'googleAnalyticsId',
  'gaClientEmail',
  'gaPrivateKey',
  'gaPropertyId',
  'gaProjectId',
] as const;

const ensureEncryptionKey = () => {
  if (!ENCRYPTION_KEY) {
    throw new Error('ENCRYPTION_KEY must be configured in environment variables');
  }
  return crypto.createHash('sha256').update(ENCRYPTION_KEY).digest();
};

const isEncryptedValue = (value: unknown): value is string =>
  typeof value === 'string' && value.startsWith('ENC::');

const encryptValue = (value: string): string => {
  const iv = crypto.randomBytes(12);
  const key = ensureEncryptionKey();
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `ENC::${iv.toString('base64')}:${tag.toString('base64')}:${encrypted.toString('base64')}`;
};

const decryptValue = (value: string): string => {
  if (!isEncryptedValue(value)) {
    return value;
  }

  const payload = value.slice('ENC::'.length);
  const [ivB64, tagB64, encryptedB64] = payload.split(':');

  if (!ivB64 || !tagB64 || !encryptedB64) {
    return value;
  }

  const key = ensureEncryptionKey();
  const iv = Buffer.from(ivB64, 'base64');
  const tag = Buffer.from(tagB64, 'base64');
  const encrypted = Buffer.from(encryptedB64, 'base64');
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8');
};

const encryptedFields = (data: Record<string, string>) => {
  GA_FIELDS.forEach((field) => {
    if (typeof data[field] === 'string' && data[field].length && !isEncryptedValue(data[field])) {
      data[field] = encryptValue(data[field]);
    }
  });
};

const decryptedFields = (doc: Record<string, string>) => {
  GA_FIELDS.forEach((field) => {
    if (isEncryptedValue(doc[field])) {
      doc[field] = decryptValue(doc[field]);
    }
  });
};

const Tenants: CollectionConfig = {
  slug: 'tenants',

  admin: {
    useAsTitle: 'name',
    hidden: ({ user }) => {
      return user?.role !== ROLES.SUPERADMIN && user?.role !== ROLES.TENANT;
    },
  },

  access: {
    read: tenantAccess,
    create: superAdminAccess,
    update: tenantAccess,
    delete: superAdminAccess,
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      access: {
        read: ({ req: { user } }) => {
          if (!user) return false;
          return user.role === ROLES.SUPERADMIN || user.role === ROLES.TENANT;
        },
        create: ({ req: { user } }) => user?.role === ROLES.SUPERADMIN,
        update: ({ req: { user } }) => user?.role === ROLES.SUPERADMIN,
      },
      admin: {
        description: 'Note: only Administrators can change this.',
      },
    },
    {
      name: 'smtpUser',
      type: 'text',
    },
    {
      name: 'smtpPassword',
      type: 'text',
    },
    {
      name: 'domain',
      type: 'text',
      access: {
        read: ({ req: { user } }) => {
          if (!user) return false;
          return user.role === ROLES.SUPERADMIN || user.role === ROLES.TENANT;
        },
        create: ({ req: { user } }) => user?.role === ROLES.SUPERADMIN,
        update: ({ req: { user } }) => user?.role === ROLES.SUPERADMIN,
      },
      admin: {
        description: 'Note: only Administrators can change this.',
      },
    },

    {
      name: 'primaryColor',
      label: 'Primary Color',
      type: 'select',
      defaultValue: 'blue',
      options: COLOR_OPTIONS,
    },
    {
      name: 'secondaryColor',
      label: 'Secondary Color',
      type: 'select',
      defaultValue: 'gray',
      options: COLOR_OPTIONS,
    },
    {
      name: 'fontFamily',
      label: 'Font Family',
      type: 'select',
      defaultValue: 'Inter',
      options: FONT_FAMILY_OPTIONS,
    },
    {
      name: 'googleAnalyticsId',
      type: 'text',
      label: 'Google Analytics Measurement ID',
      admin: {
        description: 'Enter GA4 Measurement ID (e.g., G-XXXXXXXXXX)',
        placeholder: 'G-XXXXXXXXXX',
      },
    },
    {
      name: 'gaClientEmail',
      type: 'text',
      label: 'GA Client Email',
      admin: {
        description: 'Google Analytics service account client email',
        placeholder: 'your-service-account@project.iam.gserviceaccount.com',
      },
    },
    {
      name: 'gaPrivateKey',
      type: 'text',
      label: 'GA Private Key',
      admin: {
        description: 'Google Analytics service account private key',
        placeholder: '-----BEGIN PRIVATE KEY-----',
      },
    },
    {
      name: 'gaPropertyId',
      type: 'text',
      label: 'GA Property ID',
      admin: {
        description: 'Google Analytics property ID',
        placeholder: '123456789',
      },
    },
    {
      name: 'gaProjectId',
      type: 'text',
      label: 'GA Project ID',
      admin: {
        description: 'Google Analytics project ID',
        placeholder: 'your-project-id',
      },
    },

    // {
    //   name: 'theme',
    //   type: 'text',
    //   defaultValue: 'blue',
    //   admin: {
    //     components: {
    //       Field: '@/components/admin/ThemeSelector',
    //     },
    //     description: 'Select UI theme for this tenant',
    //   },
    // },
  ],

  hooks: {
    beforeChange: [
      ({ data }) => {
        encryptedFields(data as Record<string, string>);
        return data;
      },
    ],
    afterRead: [
      ({ doc, req }) => {
        decryptedFields(doc as Record<string, string>);

        const isExternalApiRequest = req.url && req.url.includes('/api/');

        if (isExternalApiRequest) {
          delete doc.smtpPassword;
          delete doc.googleAnalyticsId;
          delete doc.gaClientEmail;
          delete doc.gaPrivateKey;
          delete doc.gaPropertyId;
          delete doc.gaProjectId;
        }
        return doc;
      },
    ],
  },
};

export default Tenants;
