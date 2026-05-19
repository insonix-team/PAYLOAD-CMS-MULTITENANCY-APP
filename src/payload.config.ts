import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { BoldFeature, ItalicFeature, lexicalEditor, LinkFeature, UnderlineFeature } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import Tenants from './collections/Tenants'
import Users from './collections/Users'
import { AboutTemplate } from './templates/AboutTemplate'
import { HomeTemplate } from './templates/HomeTemplate'
import Footers from './collections/Footers'
import Headers from './collections/Headers'
import { s3Storage } from '@payloadcms/storage-s3'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {},
  },

  collections: [Users, Media, Tenants, Pages, HomeTemplate, AboutTemplate, Headers, Footers],

  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures, BoldFeature(), ItalicFeature(), UnderlineFeature(), LinkFeature()],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'media', // Optional: folder structure in your bucket
        },
      },
      bucket: process.env.MINIO_BUCKET || 'my-media',
      config: {
        endpoint: process.env.MINIO_ENDPOINT || 'http://localhost:9000',
        forcePathStyle: true, // CRITICAL for MinIO!
        region: process.env.MINIO_REGION || 'us-east-1',
        credentials: {
          accessKeyId: process.env.MINIO_ACCESS_KEY || 'minioadmin',
          secretAccessKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
        },
      },
    }),
  ],
})
