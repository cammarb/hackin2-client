import { useToast } from '@/components/ui/use-toast'
import { selectCurrentRole } from '@/features/auth/authSlice'
import Forbidden from '@/pages/Error/403'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export type Role = 'ENTERPRISE' | 'PENTESTER'

export const RequireRole = ({ allowedRole }: { allowedRole: Role }) => {
  const role = useSelector(selectCurrentRole)
  const navigate = useNavigate()
  const location = useLocation()

  const { toast } = useToast()

  useEffect(() => {
    if (!role) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      })
      navigate('/login', { state: { from: location }, replace: true })
    }
  }, [role, toast, navigate, location])

  if (role !== allowedRole) return <Forbidden />
  if (role === allowedRole) return <Outlet />
}
