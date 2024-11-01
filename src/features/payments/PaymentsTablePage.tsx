import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../auth/authSlice'
import { PaymentsTable } from './PaymentsTable'

export const PaymentsTablePage = () => {
  const user = useSelector(selectCurrentUser)
  const { id } = useParams()

  if (user?.role === 'ENTERPRISE') {
    return (
      <div>
        <div className='mb-8 flex justify-between'>
          <h1 className='text-3xl font-semibold'>All Payments</h1>
        </div>
        <PaymentsTable
          queryKey='program'
          value={id as string}
          role={user.role}
        />
      </div>
    )
  }
  if (user?.role === 'PENTESTER') {
    return (
      <div>
        <div className='mb-8 flex justify-between'>
          <h1 className='text-3xl font-semibold'>All Payments</h1>
        </div>
        <PaymentsTable queryKey='user' value={user.id} role={user.role} />
      </div>
    )
  }
}
