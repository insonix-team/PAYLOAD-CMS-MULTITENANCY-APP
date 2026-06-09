import { s3Storage } from '@payloadcms/storage-s3';
import { seoPlugin } from '@payloadcms/plugin-seo';

export const PAYLOAD_PLUGINS = [
  s3Storage({
    collections: {
      media: {
        prefix: 'media',
      },
    },
    bucket: 'payload-media',
    config: {
      endpoint: process.env.MINIO_ENDPOINT,
      credentials: {
        accessKeyId: process.env.MINIO_ACCESSKEY || '',
        secretAccessKey: process.env.MINIO_SECRETEKEY || '',
      },
      region: 'us-east-1',
      forcePathStyle: true,
    },
  }),
  seoPlugin({
    collections: ['pages'],
    generateTitle: ({ doc }) => {
      return `${doc?.title || ''} | Your Site Name`;
    },
    generateDescription: ({ doc }) => {
      return doc?.meta?.description || '';
    },
    generateImage: ({ doc }) => {
      return doc?.meta?.image?.url || '';
    },
    generateURL: ({ doc, locale }) => {
      return `https://yourdomain.com/${locale ? locale + '/' : ''}${doc?.slug || ''}`;
    },
    uploadsCollection: 'media',
  }),
];
