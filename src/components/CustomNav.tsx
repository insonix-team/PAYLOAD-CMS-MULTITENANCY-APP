'use client';
import { ROLES } from '@/constants/AppOptions';
import { useAuth } from '@payloadcms/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function CustomNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const adminRoute = '/admin';

  const isActive = (path: string) => pathname === `${adminRoute}${path}`;

  const navItems = [
    { href: `/custom-dashboard`, label: 'Analytics' },
    { href: '/collections/pages', label: 'Pages' },
    { href: '/collections/media', label: 'Media' },
    ...(user?.role === ROLES.SUPERADMIN || user?.role === ROLES.TENANT ? [{ href: '/collections/users', label: 'Users' }] : []),
    ...(user?.role === ROLES.SUPERADMIN || user?.role === ROLES.TENANT ? [{ href: '/collections/tenants', label: 'Tenants' }] : []),
  ];

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
    /* Hide the user avatar/account link */
    .app-header__account {
      display: none !important;
    }
  `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return (
    <>
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
        <div
          style={{
            fontWeight: 'bold',
            fontSize: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Link href={adminRoute}>
            <span>INSONIX CMS</span>
          </Link>
        </div>

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
                  e.currentTarget.style.backgroundColor = 'var(--theme-elevation-50)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.href)) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
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
              e.currentTarget.style.backgroundColor = 'var(--theme-elevation-100)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--theme-elevation-50)';
            }}
          >
            <span>👤</span>
            <span>{user?.name || 'User'}</span>
            <span>{user?.role || 'User'}</span>
          </Link>

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
              e.currentTarget.style.backgroundColor = 'var(--theme-error-50)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <span>🚪</span>
            <span>Logout</span>
          </Link>
        </div>
      </header>
    </>
  );
}
