import { BountyCard } from '@/features/bounty/enterprise/BountyDetailsPage'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useGetBountyAssignmentByIdQuery } from './assignedBountyApiSlice'
import SubmissionDetails from '../submission/SubmissionDetails'
import type { Submission } from '@/utils/types'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../auth/authSlice'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const AssignedBountyDetails = () => {
  const user = useSelector(selectCurrentUser)
  const { id } = useParams()
  const {
    data: response,
    isLoading,
    isError,
    isSuccess
  } = useGetBountyAssignmentByIdQuery({ bountyId: id, userId: user?.id })

  if (isLoading) return <>is loading</>
  if (isError) return <>error</>
  if (isSuccess) {
    const bountyAssignment = response.bountyAssignment as {
      bountyId: string
      Submission: Submission
    }

    return (
      <div className='flex flex-col gap-8 mb-10'>
        <BountyCard bountyId={bountyAssignment.bountyId} />
        {bountyAssignment.Submission ? (
          <Card>
            <CardHeader>
              <CardTitle>Submission</CardTitle>
            </CardHeader>
            <CardContent className='pt-10'>
              <SubmissionDetails submission={bountyAssignment.Submission} />
            </CardContent>
          </Card>
        ) : (
          <Button asChild>
            <Link to={'submit'}>Submit Report</Link>
          </Button>
        )}
      </div>
    )
  }
}
