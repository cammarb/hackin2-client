import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from '@/components/ui/card'
import { formatDateTime } from '@/utils/dateFormatter'
import { centsToEuros } from '@/utils/stringFormatter'
import type { Payment } from './payments.dto'
import { Separator } from '@/components/ui/separator'

export const PaymentDetailsCard = ({ payment }: { payment: Payment }) => {
  return (
    <Card className='max-w-2xl mx-auto'>
      <CardHeader>
        <CardDescription>Payment details</CardDescription>
      </CardHeader>
      <CardContent className='grid gap-2'>
        <div className='flex justify-between'>
          <p>Bounty</p>
          <p>{payment.BountyAssignment.Bounty.title}</p>
        </div>
        <div className='flex justify-between'>
          <p>Pentester</p>
          <p>{payment.BountyAssignment.User.username}</p>
        </div>
        <div className='flex justify-between'>
          <p>Payed by</p>
          <p>{payment.PayedByCompanyMember.User.username}</p>
        </div>
        <div className='flex justify-between'>
          <p>Date & Time</p>
          <p>{formatDateTime(payment.payedAt)}</p>
        </div>
        <Separator className='my-5' />
        <div className='flex justify-between font-semibold text-lg'>
          <p>Amount (€)</p>
          <p>{centsToEuros(payment.amount)}</p>
        </div>
      </CardContent>
    </Card>
  )
}
