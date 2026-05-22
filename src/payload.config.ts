import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { BoldFeature, ItalicFeature, lexicalEditor, LinkFeature, UnderlineFeature } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
// @ts-ignore
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import Footers from './collections/Footers'
import Headers from './collections/Headers'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import Tenants from './collections/Tenants'
import Users from './collections/Users'
import { AboutTemplate } from './templates/AboutTemplate'
import { HomeTemplate } from './templates/HomeTemplate'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      header: ['@/components/CustomNav'],
      Nav: '@/components/CustomSidebar',
      views: {
        customDashboard: {
          Component: '@/components/views/CustomDashboard',
          path: '/custom-dashboard',
        },
      },
    },
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
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: 'payload-media',
      config: {
        credentials: {
          accessKeyId: process.env.MINIO_ACCESSKEY || '',
          secretAccessKey: process.env.MINIO_SECRETEKEY || '',
        },
        region: 'us-east-1',
        endpoint: process.env.MINIO_ENDPOINT,
        forcePathStyle: true,
      },
    }),
  ],
})
