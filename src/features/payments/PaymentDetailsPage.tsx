import { useParams } from 'react-router-dom'
import { useGetPaymentByCheckoutSessionIdQuery } from './paymentsApiSlice'
import { Skeleton } from '@/components/ui/skeleton'
import { PaymentDetailsCard } from './PaymentDetailtsCard'

export const PaymentDetailsPage = () => {
  const { checkoutSessionId } = useParams()
  const {
    data: response,
    isLoading,
    isError,
    isSuccess
  } = useGetPaymentByCheckoutSessionIdQuery(checkoutSessionId)

  if (isLoading) return <Skeleton />
  if (isError) return <p>Error</p>
  if (isSuccess) {
    const payment = response.payment
    return <PaymentDetailsCard payment={payment} />
  }
}
