'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function CustomSidebar() {
  const pathname = usePathname()
  const adminRoute = '/admin'
  const isActive = (path: string) => pathname === `${adminRoute}${path}`
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(true)

  // Define navigation structure
  const navItems = [
    { href: `/collections/headers`, label: 'Header', icon: '📌' },
    { href: '/collections/footers', label: 'Footer', icon: '📌' },
  ]

  const templateItems = [
    { href: '/collections/home-templates', label: 'Home Template', icon: '🏠' },
    { href: '/collections/about-templates', label: 'About Template', icon: '📖' },
  ]

  // Check if any template is currently active
  const isAnyTemplateActive = templateItems.some((item) => isActive(item.href))

  // Keep dropdown open if a template is active
  useEffect(() => {
    if (isAnyTemplateActive) {
      setIsTemplatesOpen(true)
    }
  }, [isAnyTemplateActive])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'var(--theme-bg)',
        borderRight: '1px solid var(--theme-elevation-100)',
      }}
    >
      {/* Logo / Brand Area */}
      <div
        style={{
          padding: '2rem 1rem',
          borderBottom: '1px solid var(--theme-elevation-100)',
          marginBottom: '2rem',
        }}
      ></div>

      {/* Navigation Links */}
      <nav style={{ flex: 1, padding: '0 0.75rem' }}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={`${adminRoute}${item.href}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.6rem 0.75rem',
              borderRadius: '6px',
              textDecoration: 'none',
              color: isActive(item.href) ? 'var(--theme-success-500)' : 'var(--theme-elevation-800)',
              backgroundColor: isActive(item.href) ? 'var(--theme-success-50)' : 'transparent',
              marginBottom: '0.25rem',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!isActive(item.href)) {
                e.currentTarget.style.backgroundColor = 'var(--theme-elevation-50)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive(item.href)) {
                e.currentTarget.style.backgroundColor = 'transparent'
              }
            }}
          >
            {/* <span style={{ fontSize: '1.2rem' }}>{item.icon}</span> */}
            <span>{item.label}</span>
          </Link>
        ))}

        {/* Templates Dropdown */}
        <div>
          <div
            onClick={() => {
              // Only allow closing if no template is active
              if (!isAnyTemplateActive) {
                setIsTemplatesOpen(!isTemplatesOpen)
              }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.6rem 0.75rem',
              borderRadius: '6px',
              cursor: 'pointer',
              color: isAnyTemplateActive ? 'var(--theme-success-500)' : 'var(--theme-elevation-800)',
              backgroundColor: isAnyTemplateActive ? 'var(--theme-success-50)' : 'transparent',
              marginBottom: '0.25rem',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!isAnyTemplateActive) {
                e.currentTarget.style.backgroundColor = 'var(--theme-elevation-50)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isAnyTemplateActive) {
                e.currentTarget.style.backgroundColor = 'transparent'
              }
            }}
          >
            {/* <span style={{ fontSize: '1.2rem' }}>🖼️</span> */}
            <span style={{ flex: 1 }}>Templates</span>
            <span>{isTemplatesOpen ? '▼' : '▶'}</span>
          </div>

          {isTemplatesOpen && (
            <div style={{ marginLeft: '1.5rem' }}>
              {templateItems.map((item) => (
                <Link
                  key={item.href}
                  href={`${adminRoute}${item.href}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.6rem 0.75rem',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    color: isActive(item.href) ? 'var(--theme-success-500)' : 'var(--theme-elevation-800)',
                    backgroundColor: isActive(item.href) ? 'var(--theme-success-50)' : 'transparent',
                    marginBottom: '0.25rem',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.href)) {
                      e.currentTarget.style.backgroundColor = 'var(--theme-elevation-50)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.href)) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }
                  }}
                >
                  {/* <span style={{ fontSize: '1.2rem' }}>{item.icon}</span> */}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}
