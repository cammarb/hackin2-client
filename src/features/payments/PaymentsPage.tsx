import { Button } from '@/components/ui/button'
import { Link, useMatch } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

export const PaymentsPage = () => {
  const isNewPage = useMatch('/programs/:programId/payments/new')

  return (
    <>
      <div className='max-w-6xl'>
        <div className='mb-8 flex gap-8'>
          <h1 className='text-3xl font-semibold'>Payments</h1>
          {!isNewPage && (
            <Button asChild>
              <Link to={'new'}>Create payment</Link>
            </Button>
          )}
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  )
}
