import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from '@/components/ui/card'
import { useGetBountyByIdQuery } from './bountyApiSlice'

export const BountyPage = (bountyId: { bountyId: string }) => {
  const {
    data: response,
    isLoading,
    isError,
    isSuccess
  } = useGetBountyByIdQuery(bountyId)

  if (isLoading) return <p>is loading</p>
  if (isError) return <p>is error</p>
  if (isSuccess) {
    const bounty = response.bounty
    return (
      <Card>
        <CardHeader>
          <CardDescription>card description</CardDescription>
        </CardHeader>
        <CardContent>{bounty.title}</CardContent>
      </Card>
    )
  }
}
