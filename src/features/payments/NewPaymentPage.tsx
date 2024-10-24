import { useParams, useSearchParams } from 'react-router-dom'
import { CreatePaymentCard } from './CreatePaymentCard'

export const NewPaymentPage = () => {
  const [searchParams] = useSearchParams()
  const pentesterId = searchParams.get('user')
  const bountyId = searchParams.get('bounty')
  const { id } = useParams()

  return (
    <CreatePaymentCard
      programId={id as string}
      pentesterId={pentesterId ? pentesterId : undefined}
      bountyId={bountyId ? bountyId : undefined}
    />
  )
}
