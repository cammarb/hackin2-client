import { CheckCircle } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { useGetPaymentByCheckoutSessionIdQuery } from './paymentsApiSlice'
import { Skeleton } from '@/components/ui/skeleton'
import { PaymentDetailsCard } from './PaymentDetailtsCard'

export const SuccessPaymentPage = () => {
  const { checkoutSessionId } = useParams()
  const {
    data: response,
    isLoading,
    isError,
    isSuccess
  } = useGetPaymentByCheckoutSessionIdQuery(checkoutSessionId)

  return (
    <>
      <div className='mt-28 grid gap-10'>
        <div className='w-full flex flex-col items-center'>
          <CheckCircle color='green' strokeWidth={3} size={48} />
          <h1 className='text-2xl font-medium'>Payment successful</h1>
          <p className='text-muted-foreground'>
            Thank you for securing expert services from our pentesters!
          </p>
        </div>
        <div>
          {isLoading && <Skeleton />}
          {isError && <p>Error</p>}
          {isSuccess && response.payment && (
            <PaymentDetailsCard payment={response.payment} />
          )}
        </div>
      </div>
    </>
  )
}
