import { ROLES } from '@/constants/AppOptions'

export const addTenant = ({ req, data }: { req: any; data: any }) => {
  if (req.user?.role !== ROLES.SUPERADMIN) {
    return {
      ...data,
      tenant: req.user.tenant,
    }
  }
  return data
}
