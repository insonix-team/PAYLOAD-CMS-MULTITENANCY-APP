'use client'

import { X, ChevronDown, Phone } from 'lucide-react'
import Link from 'next/link'
import type { Header, Page } from '@/payload-types'
import { useState } from 'react'

export default function MobileDrawer({ open, setOpen, nav, logo, ctas }: { open: boolean; setOpen: (v: boolean) => void; nav: any; ctas?: any; logo: any }) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  // URL RESOLVER
  const resolveUrl = (link: string | Page | null | undefined) => {
    if (!link) return '/'
    if (typeof link === 'object' && link?.slug) return `/${link.slug}`
    if (typeof link === 'string') return `/${link}`
    return '/'
  }

  return (
    <>
      {/* BACKDROP */}
      {open && <div className="fixed md:hidden inset-0 bg-black/40 z-40" onClick={() => setOpen(false)} />}

      {/* DRAWER */}
      <div
        className={`
          fixed left-0 top-0 h-screen w-80 bg-white shadow-xl z-50 md:hidden
          transform transition-transform duration-300 ease-out
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center">
            {logo?.url ? <img src={logo?.url} alt={logo?.alt} className="h-14 w-auto object-contain" /> : <span className="text-xl font-semibold">Menu</span>}
          </Link>

          <button onClick={() => setOpen(false)}>
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* NAV ITEMS */}
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-64px)]">
          {nav?.map((item: any, i: number) => {
            const hasDropdown = item?.children?.length > 0
            const itemKey = item?.id ?? `${item.label}-${i}`
            const itemUrl = resolveUrl(item.link)

            return (
              <div key={itemKey} className="border-b pb-2">
                {/* MAIN LINK */}
                <button onClick={() => (hasDropdown ? setActiveDropdown(activeDropdown === itemKey ? null : itemKey) : setOpen(false))} className="w-full flex items-center justify-between text-left text-gray-700 font-medium">
                  <Link href={itemUrl} onClick={() => !hasDropdown && setOpen(false)} className="flex-1 py-2">
                    {item.label}
                  </Link>

                  {hasDropdown && <ChevronDown className={`transition ${activeDropdown === itemKey ? 'rotate-180' : ''}`} />}
                </button>

                {/* DROPDOWN */}
                {hasDropdown && activeDropdown === itemKey && (
                  <div className="mt-2 pl-4 space-y-3">
                    {item.children.map((child: any, cIdx: number) => {
                      const childKey = child?.id ?? `${child.label}-${cIdx}`

                      const iconUrl = child?.icon?.url ? `${process.env.NEXT_PUBLIC_SERVER_URL}${child.icon.url}` : null

                      return (
                        <Link key={childKey} href={resolveUrl(child.href)} onClick={() => setOpen(false)} className="flex items-center gap-3 py-2 rounded hover:bg-gray-100 transition">
                          {iconUrl && <img src={iconUrl} className="w-7 h-7 object-contain" alt={child.label} />}

                          <span className="text-gray-700">{child.label}</span>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}

          {/* CTA BUTTONS */}
          {ctas?.map((cta: any, i: number) => {
            const href = cta.customUrl || resolveUrl(cta.link)
            const style: any = {
              primary: 'bg-[#01325a] text-white',
              secondary: 'bg-gray-200 text-black',
              outline: 'border border-[#01325a] text-[#01325a]',
            }

            return (
              <Link key={cta?.id ?? `${cta.label}-${i}`} href={href} onClick={() => setOpen(false)} className={`uppercase  border-0 hover:bg-primary-600 shadow-2xl cursor-pointer px-8 md:px-8! py-2 block text-center w-full  font-semibold mt-2 ${style[cta.style]}`}>
                {cta.label}
              </Link>
            )
          })}
          <Link href={'#'} className={`uppercase  border-0 hover:bg-primary-600 shadow-2xl cursor-pointer px-8 md:px-8! py-2  flex justify-center gap-1 text-white! font-medium transition bg-secondary whitespace-nowrap }`}>
            <Phone /> +1 604-261-8164
          </Link>
        </div>
      </div>
    </>
  )
}
