import { BountyCard } from '@/features/bounty/enterprise/BountyDetailsPage'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useGetBountyAssignmentByIdQuery } from './assignedBountyApiSlice'
import SubmissionDetails from '../submission/SubmissionDetails'
import type { Submission } from '@/utils/types'

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
      Submission: Submission
    }

    return (
      <>
        <BountyCard bountyId={bountyAssignment.bountyId} />
        {bountyAssignment.Submission && (
          <SubmissionDetails submission={bountyAssignment.Submission} />
        )}
        <Button asChild>
          <Link to={'submit'}>Submit Report</Link>
        </Button>
      </>
    )
  }
}
