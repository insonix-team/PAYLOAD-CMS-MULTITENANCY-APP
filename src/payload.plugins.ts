import { s3Storage } from '@payloadcms/storage-s3';

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
];
