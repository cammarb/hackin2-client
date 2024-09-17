import { BountyCard } from '@/features/bounty/enterprise/BountyDetailsPage'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useGetBountyAssignmentByIdQuery } from './assignedBountyApiSlice'
import SubmissionsList from '../submission/SubmissionsList'

export const AssignedBountyDetails = () => {
  const { id } = useParams()
  const {
    data: response,
    isLoading,
    isError,
    isSuccess
  } = useGetBountyAssignmentByIdQuery(id)

  if (isLoading) return <>is loading</>
  if (isError) return <>error</>
  if (isSuccess) {
    const bountyAssignment = response.bountyAssignment as {
      bountyId: string
      Submissions: object[]
    }
    return (
      <>
        <BountyCard bountyId={bountyAssignment.bountyId} />
        {bountyAssignment.Submissions && <SubmissionsList />}
        <Button asChild disabled={bountyAssignment.Submissions ? true : false}>
          <Link to={'submit'}>Submit Report</Link>
        </Button>
      </>
    )
  }
}
