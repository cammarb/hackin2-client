import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

export const PaymentsPage = () => {
  return (
    <>
      <div>Payments</div>
      <Button asChild>
        <Link to={'new'}>Create payment</Link>
      </Button>
      <Outlet />
    </>
  )
}
