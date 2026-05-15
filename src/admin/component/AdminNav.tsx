'use client'

import { useAuth } from '@payloadcms/ui'

export function AdminNav() {
  const { user } = useAuth()

  console.log('AdminNav user:', user)
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px',
      }}
    >
      <img
        src={user?.avatar || '/default-avatar.png'}
        alt="User"
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
        }}
      />

      <div>
        <div style={{ fontWeight: 600 }}>{user?.name}</div>

        <div style={{ fontSize: 12 }}>{user?.role}</div>
      </div>
    </div>
  )
}
