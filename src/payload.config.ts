import { mongooseAdapter } from '@payloadcms/db-mongodb'
import {
  BoldFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  UnderlineFeature,
} from '@payloadcms/richtext-lexical'
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

  collections: [Users, Media, Tenants, Pages, HomeTemplate, AboutTemplate],

  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,

      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      LinkFeature(),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [],
})
