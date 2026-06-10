import { ROLES } from '@/constants/AppOptions';
import { User } from '@/payload-types';

export const isSuperAdmin = (user: User) => {
  return user?.role === ROLES.SUPERADMIN;
};

export const getTenantId = (user: User) => {
  if (!user?.tenant) return null;

  return typeof user.tenant === 'object' ? user.tenant.id : user.tenant;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const tenantAccess = ({ req: { user } }: any) => {
  if (isSuperAdmin(user)) {
    return true;
  }

  return {
    tenant: {
      equals: getTenantId(user),
    },
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const tenantCreateAccess = ({ req: { user } }: any) => {
  return !!user;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const superAdminAccess = ({ req: { user } }: any) => {
  if (!user) return false;
  return isSuperAdmin(user);
};
