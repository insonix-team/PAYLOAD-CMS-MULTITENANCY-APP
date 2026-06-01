'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Accessibility, Mail, MapPin, ParkingCircle, Phone } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'
import { OfficeHoursCard } from './OfficeHoursUI'

type Props = {
  data: {
    blockType: 'mapInfoBlock'
    title: string
    mapEmbedUrl: string
    mapLink: string
    address: string
    phone: string
    email: string
    officeHoursSection: any
    accessibilityFeatures: boolean
    parkingAvailable: boolean
  }
  tenant?: string
}

export default function MapInfoBlockUI({ data }: Props) {
  const { title, mapEmbedUrl, mapLink, address, phone, email, accessibilityFeatures, parkingAvailable, officeHoursSection } = data

  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  return (
    <main ref={sectionRef} className="relative md:py-24 py-0 overflow-hidden">
      {/* 🌎 MAP */}
      <motion.div style={{ y, scale }} className="md:absolute relative inset-0 h-[300px] md:h-full">
        <div className="hidden md:block absolute inset-0 z-[5] pointer-events-none"></div>

        <iframe title={title} src={data.mapEmbedUrl} className="w-full h-full pointer-events-auto" loading="lazy" allowFullScreen />
      </motion.div>

      {/* ✨ Spot Light */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div
          className="absolute left-1/2 top-1/2 w-64 h-64 rounded-full"
          style={{
            transform: 'translate(-50%, -50%)',
            WebkitMask: 'radial-gradient(circle 170px at center, transparent 0%, transparent 60%, black 61%)',
            mask: 'radial-gradient(circle 170px at center, transparent 0%, transparent 60%, black 61%)',
          }}
        />
      </div>

      {/* 📍 Animated Map Pin */}
      <motion.div className="absolute left-1/2 top-1/2 z-10 hidden md:block" style={{ translateX: '-50%', translateY: '-50%' }} animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <div className="relative">
          <MapPin className="w-10 h-10 text-secondary drop-shadow-lg" />
          <span className="absolute inset-0 rounded-full bg-secondary/40 animate-ping" />
        </div>
      </motion.div>

      {/* CONTENT */}
      <div className="relative container mx-auto md:mt-0 mt-6 px-4">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.2 } },
          }}
        >
          <div className="grid xl:grid-cols-4 gap-0">
            <div className="space-y-6 md:col-start-4 w-full md:w-auto">
              {/* CARD */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -6 }}
                className="bg-primary backdrop-blur-xl border border-white/20 rounded-xl p-6 text-white shadow-2xl"
              >
                <h3 className="tracking-wide mb-4">{title}</h3>

                <div className="space-y-4 text-sm">
                  {/* ADDRESS */}
                  <div className="flex gap-3 items-start">
                    <Link target="_blank" href={data?.mapLink || '#'} rel="noopener noreferrer" className="flex items-center gap-3 text-sm group">
                      <div className="w-9 h-9 rounded-lg bg-background/5 group-hover:bg-secondary flex items-center justify-center transition-colors shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <p className="text-white/90 text-sm">{address}</p>
                    </Link>
                  </div>

                  {/* PHONE */}
                  <div className="flex gap-3 items-start">
                    <Link href={`tel:${data.phone}`} rel="noopener noreferrer" className="flex items-center gap-3 text-sm group">
                      <div className="w-9 h-9 rounded-lg bg-background/5 group-hover:bg-secondary flex items-center justify-center transition-colors shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <p className="text-white/90 text-sm">{data.phone}</p>
                    </Link>
                  </div>

                  {/* EMAIL */}
                  <div className="flex gap-3 items-start">
                    <Link href={`mailto:${data.email}`} rel="noopener noreferrer" className="flex items-center gap-3 text-sm group">
                      <div className="w-9 h-9 rounded-lg bg-background/5 group-hover:bg-secondary flex items-center justify-center transition-colors shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <p className="text-white/90 text-sm">{data.email}</p>
                    </Link>
                  </div>

                  {/* ACCESSIBILITY */}
                  {accessibilityFeatures && (
                    <div className="flex gap-3 items-start">
                      <div className="flex items-center gap-3 text-sm group">
                        <div className="w-9 h-9 rounded-lg bg-background/5 flex items-center justify-center transition-colors shrink-0">
                          <Accessibility className="w-5 h-5" />
                        </div>
                        <p className="text-white/90 text-sm">Accessibility Available</p>
                      </div>
                    </div>
                  )}

                  {/* PARKING */}
                  {parkingAvailable && (
                    <div className="flex gap-3 items-start">
                      <div className="flex items-center gap-3 text-sm group">
                        <div className="w-9 h-9 rounded-lg bg-background/5 flex items-center justify-center transition-colors shrink-0">
                          <ParkingCircle className="w-5 h-5" />
                        </div>
                        <p className="text-white/90 text-sm">Parking Available</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* OFFICE HOURS CARD */}
              <OfficeHoursCard timings={officeHoursSection?.officeHours} title={officeHoursSection?.officetitle} timezone="America/Los_Angeles" />
              {/* INFO */}
              <motion.div
                variants={{
                  hidden: { opacity: 1, y: 40 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -6 }}
              >
                {/* EXTRA INFO */}
                <div className="mt-0 rounded-2xl  overflow-hidden shadow-xl bg-gradient-to-br from-[#2e5c7f] to-[#244a66] text-white relative">
                  {/* Soft Accent Glow */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#b1896d]/30 rounded-full blur-3xl"></div>

                  <div className="relative z-10 p-6 md:p-7">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-5">
                      <h3 className="tracking-wide">Patient Information</h3>
                    </div>

                    {/* Info Items */}
                    <div className="grid sm:grid-cols-1 gap-4">
                      <div className="flex items-start gap-3">
                        <Link href={'#'} rel="noopener noreferrer" className="flex items-center gap-3 text-sm group cursor-pointer">
                          <div className="w-9 h-9 rounded-lg bg-background/5 group-hover:bg-secondary flex items-center justify-center transition-colors shrink-0">
                            <ParkingCircle className="w-5 h-5 " />
                          </div>
                          <p className="text-sm text-white/90">Easy parking available for a hassle-free visit</p>
                        </Link>
                      </div>

                      <div className="flex items-start gap-3">
                        <Link href={'#'} rel="noopener noreferrer" className="flex items-center gap-3 text-sm group cursor-pointer">
                          <div className="w-9 h-9 rounded-lg bg-background/5 group-hover:bg-secondary flex items-center justify-center transition-colors shrink-0">
                            <Accessibility className="w-5 h-5 " />
                          </div>
                          <p className="text-sm text-white/90">Fully wheelchair accessible clinic</p>
                        </Link>
                      </div>

                      <div className="flex items-start gap-3">
                        <Link href={'#'} rel="noopener noreferrer" className="flex items-center gap-3 text-sm group cursor-pointer">
                          <div className="w-9 h-9 rounded-lg bg-background/5 group-hover:bg-secondary flex items-center justify-center transition-colors shrink-0">
                            <MapPin className="w-5 h-5 " />
                          </div>
                          <p className="text-sm text-white/90">Conveniently located in a central area</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
