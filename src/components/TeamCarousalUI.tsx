'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { motion } from 'framer-motion'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Media } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'
type Props = {
  data: {
    slides: {
      image: string | Media

      name?: string
      designation?: string

      ctaButtons?: {
        label: string
        url: string
        newTab?: boolean
        style?: 'primary' | 'secondary'
      }[]

      content?: {
        root: {
          type: string
          children: {
            type: any
            version: number
            [k: string]: unknown
          }[]
          indent: number
          version: number
        }
        [k: string]: unknown
      } | null

      id?: string | null
    }[]

    slidesPerMobile?: number | null
    slidesPerTablet?: number | null
    slidesPerDesktop?: number | null
    autoplay?: boolean | null
    delay?: number | null
    id?: string | null
  }
  tenant?: string
}

export const TeamCarousalUI = ({ data }: Props) => {
  const { slides, autoplay, delay, slidesPerMobile, slidesPerTablet, slidesPerDesktop } = data
  console.log(slides)
  console.log(data)
  return (
    <section className="w-full py-12">
      <div className="container mx-auto">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={slidesPerMobile || 1}
          navigation
          pagination={{ clickable: true }}
          autoplay={
            autoplay
              ? {
                  delay: delay || 3000,
                  disableOnInteraction: false,
                }
              : undefined
          }
          breakpoints={{
            640: {
              slidesPerView: slidesPerTablet || 2,
            },
            1024: {
              slidesPerView: slidesPerDesktop || 3,
            },
          }}
          className="pb-10"
        >
          {slides?.map((slide, i) => {
            const image = slide.image && typeof slide.image === 'object' && 'url' in slide.image ? (slide.image as Media) : null

            return (
              <SwiperSlide key={slide.id || i}>
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center py-12">
                  {/* <div className="relative p-0 w-full rounded overflow-hidden bg-secondary-600">
                      <div className="relative aspect-[16/9]  mx-auto">
                        <Image src={doc.image.url} alt={doc.name} fill className="object-contain rounded-md" />
                      </div>
                    </div> */}
                  <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: 'easeOut' }} viewport={{ amount: 0.3 }} className="relative flex justify-center lg:justify-center pr-0 lg:pr-6 pt-10 lg:pt-0">
                    <div className="relative bg-secondary">
                      {/* OFFSET BG BOX */}
                      <div className="absolute mx-auto inset-0 translate-x-5 translate-y-5 bg-secondary/20 -z-10"></div>

                      {/* CORNER BORDERS */}
                      <span className="absolute w-10 h-10 border-secondary -top-3 -left-3 border-t-2 border-l-2"></span>
                      <span className="absolute w-10 h-10 border-secondary -top-3 -right-3 border-t-2 border-r-2"></span>
                      <span className="absolute w-10 h-10 border-secondary -bottom-3 -left-3 border-b-2 border-l-2"></span>
                      <span className="absolute w-10 h-10 border-secondary -bottom-3 -right-3 border-b-2 border-r-2"></span>

                      {/* MAIN IMAGE */}
                      <div className="w-[100%] md:w-[100%] overflow-hidden relative">
                        {image?.url && <Image src={image.url} alt={image.alt || 'Slide'} width={800} height={800} className="w-full h-full object-cover object-top transition duration-700 hover:scale-[1.03]" draggable={false} />}
                        {/* GRADIENT OVERLAY */}
                        <div className="absolute text-right bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent px-6 py-5">
                          <p className="text-secondary-50 text-xl font-light italic font-serif">{'Clinical Excellence'}</p>
                          <p className="text-white/60 text-[10px] uppercase tracking-[0.2em] mt-0.5">{'Local Roots · Patient-Focused'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="absolute -top-6 left-4 md:-left-1 bg-white border border-secondary/40 shadow-xl px-5 py-3.5" style={{ animation: 'floatBadge 4s ease-in-out 1.2s infinite' }}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-[9px] uppercase tracking-[0.2em] text-green-700 font-semibold">Available Today</span>
                      </div>

                      <p className="text-primary text-lg font-serif">{slide.name}</p>
                    </div>
                  </motion.div>
                  {/* CONTENT */}

                  <div className="space-y-6">
                    {slide.content && <RichText data={slide.content as any} />}
                    <div className="pt-6 border-t flex gap-4 items-center justify-between">
                      <div className="w-full">
                        <h3 className="text-xl font-semibold text-gray-900"> {slide.name}</h3>
                        <p className="text-secondary font-medium"> {slide.designation}</p>
                      </div>
                      {/* Links */}
                      <div className="flex w-full gap-4 mt-4 flex-wrap justify-end">
                        {slide.ctaButtons?.map((button, index) => (
                          <Link key={index} href={button.url} target={button.newTab ? '_blank' : undefined} rel={button.newTab ? 'noopener noreferrer' : undefined} className={button.style === 'secondary' ? 'px-4 py-2 border border-primary rounded-0' : 'px-4 py-2 bg-primary text-white rounded-0'}>
                            {button.label}
                          </Link>
                        ))}
                      </div>

                      <div>
                        <div className="md:flex flex-wrap space-x-1 gap-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </section>
  )
}
