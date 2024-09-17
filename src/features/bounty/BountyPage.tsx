import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetBountyAssignmentsQuery } from '@/features/assignedBounty/assignedBountyApiSlice'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../auth/authSlice'
import { DataTable } from './AssignmentTable/data-table'
import { columns } from './AssignmentTable/columns'

export const BountyPage = () => {
  const user = useSelector(selectCurrentUser)
  const {
    data: response,
    isLoading,
    isError,
    isSuccess
  } = useGetBountyAssignmentsQuery({ key: 'user', value: user?.id })

  if (isLoading) return <p>is loading</p>
  if (isError) return <p>is error</p>
  if (isSuccess) {
    const bountiesAssigned = response.bountyAssignments
    return (
      <Card>
        <CardHeader>
          <CardTitle>Bounties assigned</CardTitle>
          {/* <CardDescription></CardDescription> */}
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={bountiesAssigned} />
        </CardContent>
      </Card>
    )
  }
}
