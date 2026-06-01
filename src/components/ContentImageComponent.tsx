'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'
import { motion } from 'framer-motion'
import Image from 'next/image'

type MediaType = {
  url?: string | null
  alt?: string | null
}

type Props = {
  data: {
    media?: number | MediaType | null
    position?: 'left' | 'right'
    content?: any
    availabilityText?: string
    relatedText?: string
    imageShortDescription?: string
    imageName?: string
    backgroundColor?: 'bg-card' | 'bg-white'
    padding?: 'sm' | 'md' | 'lg'
  }
  tenant?: string
}

export const ContentImageComponentUI = ({ data }: Props) => {
  const { media, position = 'left', content, availabilityText, relatedText, imageShortDescription, imageName, backgroundColor = 'bg-white', padding = 'md' } = data

  const isLeft = position === 'left'
  const bgClass = backgroundColor === 'bg-card' ? 'bg-card' : 'bg-white'
  const paddingClass = padding === 'lg' ? 'p-12' : padding === 'md' ? 'p-8' : 'p-4'
  const mediaUrl = typeof media === 'object' && media?.url ? media.url : null
  const mediaAlt = typeof media === 'object' && media?.alt ? media.alt : imageName || 'Media image'

  return (
    <section className={`  w-full py-12 ${bgClass} ${paddingClass}`}>
      <div className={`container mx-auto flex flex-col items-center gap-10 md:flex-row ${!isLeft ? 'md:flex-row-reverse' : ''}`}>
        {/* IMAGE BLOCK */}
        <div className="relative w-full md:w-1/2">
          <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: 'easeOut' }} viewport={{ once: true, amount: 0.3 }} className="relative">
            {/* OFFSET BG BOX */}
            <div className="absolute inset-0 -z-10 translate-x-5 translate-y-5 rounded-xl bg-secondary/20" />

            {/* CORNER BORDERS */}
            <span className="absolute -left-3 -top-3 h-10 w-10 border-l-2 border-t-2 border-secondary" />
            <span className="absolute -right-3 -top-3 h-10 w-10 border-r-2 border-t-2 border-secondary" />
            <span className="absolute -bottom-3 -left-3 h-10 w-10 border-b-2 border-l-2 border-secondary" />
            <span className="absolute -bottom-3 -right-3 h-10 w-10 border-b-2 border-r-2 border-secondary" />

            {/* MAIN IMAGE */}
            <div className="relative w-full overflow-hidden rounded-xl shadow-md">
              {mediaUrl ? <Image src={mediaUrl} alt={mediaAlt} width={1200} height={800} className="h-auto w-full object-cover" priority={false} /> : <div className="h-64 w-full rounded-xl bg-gray-200" />}

              {/* GRADIENT OVERLAY */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-6 py-5">
                {relatedText && <p className="font-serif text-xl font-light italic text-secondary-50">{relatedText}</p>}

                {imageName && <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-white/60">{imageName}</p>}
              </div>
            </div>

            {/* FLOATING BADGE 1 */}
            {mediaUrl && (
              <div
                className="absolute -bottom-8 -right-2 w-[135px] overflow-hidden rounded-lg border-[3px] border-white shadow-[0_20px_60px_rgba(0,0,0,0.25)] md:-right-8 md:w-[180px]"
                style={{
                  animation: 'floatBadge 5s ease-in-out infinite',
                }}
              >
                <Image src={mediaUrl} alt={mediaAlt} width={200} height={200} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 p-3">
                  {imageShortDescription && <p className="hidden text-[8px] font-semibold uppercase leading-4 tracking-[0.18em] text-secondary-50 md:block">{imageShortDescription}</p>}
                  <p className="text-[10px] text-white/80">Same-Day Emergencies.</p>
                </div>
              </div>
            )}

            {/* FLOATING BADGE 2 */}
            {(relatedText || availabilityText) && (
              <div
                className="absolute -top-6 left-4 rounded-lg border border-secondary/40 bg-white px-5 py-3.5 shadow-xl md:-left-10"
                style={{
                  animation: 'floatBadge 4s ease-in-out 1.2s infinite',
                }}
              >
                {relatedText && (
                  <div className="mb-1 flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

                    <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-green-700">{relatedText}</span>
                  </div>
                )}

                {availabilityText && <p className="font-serif text-lg text-primary">{availabilityText}</p>}
              </div>
            )}
          </motion.div>
        </div>

        {/* TEXT CONTENT */}
        <div className="prose max-w-none md:w-1/2">{content && <RichText data={content} />}</div>
      </div>
    </section>
  )
}
