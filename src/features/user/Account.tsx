import { useSelector } from 'react-redux'
import { selectCurrentUser } from '@/features/auth/authSlice'
import { useGetUserQuery } from '@/features/user/userSlice'

export default function Account() {
  const user = useSelector(selectCurrentUser)

  return <></>
}
