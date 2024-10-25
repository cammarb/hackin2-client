import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'
import { useParams } from 'react-router-dom'

export const SuccessPaymentPage = () => {
  const { checkoutSessionId } = useParams()

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
          <Card className='max-w-2xl mx-auto'>
            <CardHeader>
              <CardDescription>Payment details</CardDescription>
            </CardHeader>
            <CardContent className='grid gap-2'>
              <div className='flex justify-between'>
                <p>Amount</p>
                <p>€50</p>
              </div>
              <div className='flex justify-between'>
                <p>Date & Time</p>
                <p>heute</p>
              </div>
              <div className='flex justify-between'>
                <p>Reference number</p>
                <p>#</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
