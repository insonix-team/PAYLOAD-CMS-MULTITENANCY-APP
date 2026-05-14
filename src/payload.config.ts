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
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import Users from './collections/Users'
import { Media } from './collections/Media'
import Tenants from './collections/Tenants'
import Pages from './collections/Pages'
import { Layouts } from './collections/Layouts'
import { HomeTemplate } from './collections/template.ts/HomeTemplate'
import { HomePage } from './collections/HomePage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [Users, Media, Tenants, Pages, Layouts, HomeTemplate, HomePage],

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
