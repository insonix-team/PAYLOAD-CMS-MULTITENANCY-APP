export const addTenant = ({ req, data }: { req: any; data: any }) => {
  if (req.user?.role !== 'superadmin') {
    return {
      ...data,
      tenant: req.user.tenant,
    }
  }
  return data
}
