import { selectCurrentUser } from '@/features/auth/authSlice'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export const RequireAuthentication = () => {
  const user = useSelector(selectCurrentUser)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: location }, replace: true })
    }
  }, [user, navigate, location])

  if (user) return <Outlet />
}
