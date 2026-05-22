'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@payloadcms/ui'
import { useEffect, useState } from 'react'

export default function CustomNav() {
  const pathname = usePathname()
  const { user } = useAuth()
  const adminRoute = '/admin'

  const isActive = (path: string) => pathname === `${adminRoute}${path}`

  // Define your navigation structure
  const navItems = [
    { href: `/custom-dashboard`, label: 'Dashboard', icon: '📊' },
    { href: '/collections/pages', label: 'Pages', icon: '📄' },
    { href: '/collections/media', label: 'Media', icon: '🖼️' },
    { href: '/collections/users', label: 'Users', icon: '👥' },
    { href: '/collections/tenants', label: 'Tenants', icon: '🏢' },
  ]

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
    /* Hide the user avatar/account link */
    .app-header__account {
      display: none !important;
    }
  `
    document.head.appendChild(style)
    return () => style.remove()
  }, [])

  return (
    <>
      {/* Horizontal Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
          backgroundColor: 'var(--theme-bg)',
          borderBottom: '1px solid var(--theme-elevation-100)',
          height: '60px',
          width: '100%',
        }}
      >
        {/* Logo / Brand Area */}
        <div
          style={{
            fontWeight: 'bold',
            fontSize: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span></span>
          <span>INSONIX CMS</span>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={`${adminRoute}${item.href}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                textDecoration: 'none',
                color: isActive(item.href) ? 'var(--theme-success-500)' : 'var(--theme-elevation-800)',
                backgroundColor: isActive(item.href) ? 'var(--theme-success-50)' : 'transparent',
                transition: 'all 0.2s',
                fontSize: '0.875rem',
                fontWeight: isActive(item.href) ? 500 : 400,
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
              <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right Side - User & Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          {/* Quick Stats / User Info */}
          <Link
            href={`${adminRoute}/account`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.25rem 0.75rem',
              borderRadius: '20px',
              backgroundColor: 'var(--theme-elevation-50)',
              fontSize: '0.875rem',
              textDecoration: 'none',
              color: 'inherit',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--theme-elevation-100)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--theme-elevation-50)'
            }}
          >
            <span>👤</span>
            <span>{user?.role || 'User'}</span>
          </Link>

          {/* Logout Button */}
          <Link
            href={`${adminRoute}/logout`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 0.75rem',
              borderRadius: '6px',
              textDecoration: 'none',
              color: 'var(--theme-error-500)',
              fontSize: '0.875rem',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--theme-error-50)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            <span>🚪</span>
            <span>Logout</span>
          </Link>
        </div>
      </header>
    </>
  )
}
