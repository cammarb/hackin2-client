import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetBountyByIdQuery } from '../bountyApiSlice'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { formatDateTime } from '@/utils/dateFormatter'
import { Separator } from '@/components/ui/separator'
import { useGetSeverityRewardByIdQuery } from '@/features/severityReward/severityRewardSlice'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { BountyForm } from './BountyForm'
import { useGetUserQuery } from '@/features/user/userSlice'
import { DataTable } from '../AssignmentTable/data-table'
import { columns } from '../AssignmentTable/columns'
import { useGetBountyAssignmentsQuery } from '@/features/assignedBounty/assignedBountyApiSlice'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '@/features/auth/authSlice'
import type { Bounty } from '../bounty.dto'

export const BountyDetailsPage = () => {
  const { bountyId } = useParams()

  return (
    <main className='my-10 flex flex-col gap-10'>
      {bountyId && (
        <>
          <BountyCard bountyId={bountyId} />
          <AssignedUsersCard bountyId={bountyId} />
        </>
      )}
    </main>
  )
}

export const BountyCard = ({ bountyId }: { bountyId: string }) => {
  const user = useSelector(selectCurrentUser)
  const {
    data: response,
    isLoading,
    isError,
    isSuccess
  } = useGetBountyByIdQuery(bountyId)

  if (isLoading) return <p>is loading</p>
  if (isError) return <p>is error</p>
  if (isSuccess) {
    const bounty: Bounty = response.bounty
    return (
      <Card className='w-full' key={bounty.id}>
        <CardHeader>
          <div className='flex justify-between'>
            <CardTitle className='text-xl'>{bounty.title}</CardTitle>
            <div className='flex gap-3'>
              <Button variant={'secondary'} asChild>
                <p>{bounty.status}</p>
              </Button>
              {user?.role && user.role === 'ENTERPRISE' ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant='outline'>Edit</Button>
                  </DialogTrigger>
                  <BountyForm
                    variant='edit'
                    bounty={bounty}
                    programId={bounty.programId}
                  />
                </Dialog>
              ) : undefined}
            </div>
          </div>
        </CardHeader>

        <CardContent className='grid gap-8'>
          <div className='grid gap-2'>
            <h4 className='text-sm font-medium leading-none mb-2'>
              Description
            </h4>
            <Separator />
            {bounty.description}
          </div>

          <div className='grid gap-2'>
            <h4 className='text-sm font-medium leading-none mb-2'>
              Severity Reward (€)
            </h4>
            <Separator />
            <SeverityRewardBadge severityRewardId={bounty.severityRewardId} />
          </div>

          <div className='grid gap-2'>
            <h4 className='text-sm font-medium leading-none mb-2'>Scope</h4>
            <Separator />
            {bounty.description}
          </div>

          <div className='grid gap-2'>
            <h4 className='text-sm font-medium leading-none mb-2'>Notes</h4>
            <Separator />
            {bounty.description}
          </div>

          <div className='py-2 text-sm flex flex-col gap-2'>
            <div>
              <span className='font-semibold'>Created: </span>
              {formatDateTime(bounty.createdAt)}
            </div>
            <div>
              <span className='font-semibold'>Updated: </span>
              {formatDateTime(bounty.updatedAt)}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
}

export const AssignedUsersCard = ({ bountyId }: { bountyId: string }) => {
  const {
    data: response,
    isLoading,
    isError,
    isSuccess
  } = useGetBountyAssignmentsQuery({ key: 'bounty', value: bountyId })

  // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
  let assignedUsers
  if (isSuccess) {
    const bountyAssignments = response.bountyAssignments
    assignedUsers = <DataTable columns={columns} data={bountyAssignments} />
  }
  if (isLoading) return <p>is loading</p>
  if (isError) return <p>error</p>

  return (
    <Card className='max-w-screen-lg'>
      <CardHeader>
        <div className='flex justify-between'>
          <CardTitle className='text-xl'>Assigned Users</CardTitle>
        </div>
      </CardHeader>
      <CardContent>{assignedUsers}</CardContent>
    </Card>
  )
}

export const User = ({ userId }: { userId: string }) => {
  const {
    data: response,
    isLoading,
    isError,
    isSuccess
  } = useGetUserQuery(userId)

  if (isSuccess) {
    const user = response.user
    return <p>{user.username}</p>
  }
  if (isLoading) return <p>is loading</p>
  if (isError) return <p>error</p>
}

const SeverityRewardBadge = ({
  severityRewardId
}: { severityRewardId: string }) => {
  const {
    data: response,
    isLoading,
    isError,
    isSuccess
  } = useGetSeverityRewardByIdQuery(severityRewardId)

  if (isLoading) return
  if (isError) return
  if (isSuccess) {
    const severityReward = response.severityReward
    const severity: 'high' | 'low' | 'medium' | 'critical' =
      severityReward.severity.toLowerCase()
    return (
      <div className='flex items-center space-x-10 text-sm'>
        <Badge variant={severity}>{severityReward.severity}</Badge>
        <div>
          {severityReward.min} - {severityReward.max}
        </div>
      </div>
    )
  }
}
