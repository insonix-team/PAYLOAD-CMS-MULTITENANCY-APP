'use client'

import type { Page } from '@/payload-types'
import { ChevronDown, Phone } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import MobileDrawer from './MobileDrawer'

export function HeaderCTA({ navItems, ctas, logo }: { navItems: any[]; ctas: any[]; logo: any }) {
  const nav = navItems || []

  const [open, setOpen] = useState(false)
  const [small, setSmall] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setSmall(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // URL RESOLVER
  const resolveUrl = (link: string | Page | null | undefined) => {
    if (!link) return '/'
    if (typeof link === 'object' && link?.slug) return `/${link.slug}`
    if (typeof link === 'string') return `/${link}`
    return '/'
  }
  return (
    <header className={['fixed w-full z-[999] top-0 bg-white backdrop-blur-xl transition-all duration-300 ', small ? 'shadow-md' : 'shadow-sm'].join(' ')}>
      <div className="mx-auto  flex items-center justify-between h-20">
        {/* LOGO */}
        <Link href="/" className="flex items-center">
          {logo?.url ? <img src={logo?.url} alt={logo?.alt} className="h-14 w-auto object-contain" /> : <span className="text-2xl font-bold text-[#01325a]">DentalCare</span>}
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-8 items-center relative z-[1000]">
          {nav.map((item: any, i: number) => {
            const hasDropdown = item?.children?.length > 0
            const itemKey = item?.id ?? `${item.label}-${i}`

            return (
              <div key={itemKey} className="relative" onMouseEnter={() => setActiveDropdown(item.label)} onMouseLeave={() => setActiveDropdown(null)}>
                {/* MAIN LINK */}
                <Link href={resolveUrl(item.link)} className="flex items-center gap-1 text-gray-700 font-medium hover:text-[#01325a] transition">
                  {item.label}
                  {hasDropdown && <ChevronDown size={16} />}
                </Link>

                {/* DROPDOWN */}
                {hasDropdown && activeDropdown === item.label && (
                  <div className="absolute left-0 top-full mt-0 w-60 bg-white shadow-xl rounded-sm border-0 p-2 z-[2000]">
                    {item.children.map((child: any, cIdx: number) => {
                      const childKey = child?.id ?? `${child.label}-${cIdx}`

                      return (
                        <Link key={childKey} href={resolveUrl(child.href)} className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 transition">
                          {child.icon.url && <img src={child.icon.url} alt={child.label} className="w-8 h-8 object-contain" />}
                          <span>{child.label}</span>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* CTA BUTTONS */}
        <div className="hidden xl:block flex justify-end w-full xl:w-auto p-0  gap-3">
          {ctas?.map((cta: any, i: number) => {
            const href = cta.customUrl || resolveUrl(cta.link)
            const ctaKey = cta?.id ?? `${cta.label}-${i}`

            const variants: any = {
              primary: 'bg-[#01325a] text-white hover:bg-opacity-90',
              secondary: 'bg-gray-200 text-black hover:bg-gray-300',
              outline: 'border border-[#01325a] text-[#01325a] hover:bg-[#01325a] hover:text-white',
            }

            return (
              <Link key={ctaKey} href={href} className={`bg-primary uppercase text-white! border-0 hover:bg-primary-600 shadow-2xl cursor-pointer px-8 md:px-8! py-2 transition  block rounded-0 font-medium  whitespace-nowrap ${variants[cta.style || 'primary']}`}>
                {cta.label}
              </Link>
            )
          })}
          <Link href={'#'} className={`uppercase  border-0 hover:bg-primary-600 shadow-2xl cursor-pointer px-8 md:px-8! py-2  flex justify-center gap-1 text-white! font-medium transition bg-secondary whitespace-nowrap }`}>
            <Phone /> +1 604-261-8164
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button onClick={() => setOpen(true)} className="md:hidden text-3xl text-[#01325a]">
          ☰
        </button>
      </div>

      {/* MOBILE DRAWER */}
      <MobileDrawer open={open} setOpen={setOpen} nav={nav} ctas={ctas} logo={logo} />
    </header>
  )
}
