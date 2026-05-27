import { ROLES } from '@/constants/AppOptions'
import { Access } from 'payload'

export const isSuperAdmin = (user: any) => {
  return user?.role === ROLES.SUPERADMIN
}

export const getTenantId = (user: any) => {
  if (!user?.tenant) return null

  return typeof user.tenant === 'object' ? user.tenant.id : user.tenant
}

export const tenantAccess = ({ req: { user } }: any) => {
  if (isSuperAdmin(user)) {
    return true
  }

  return {
    tenant: {
      equals: getTenantId(user),
    },
  }
}

export const tenantCreateAccess = ({ req: { user } }: any) => {
  return !!user
}
