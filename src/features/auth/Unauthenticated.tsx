import { selectCurrentRole, selectCurrentUser } from '@/features/auth/authSlice'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export const Unauthenticated = () => {
  const user = useSelector(selectCurrentUser)
  const role = useSelector(selectCurrentRole)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (user || role) {
      navigate('/', { state: { from: location }, replace: true })
    }
  }, [user, role, navigate, location])

  if (!user || !role) return <Outlet />
}
