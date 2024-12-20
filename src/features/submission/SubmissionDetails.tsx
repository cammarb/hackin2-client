import Markdown from 'react-markdown'
import { Separator } from '@/components/ui/separator'
import { formatDate } from '@/utils/dateFormatter'
import type { Submission } from '@/utils/types'
// import { getBadgeVariant } from '@/components/RewardsTable'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Link, useParams } from 'react-router-dom'
import { selectCurrentUser } from '../auth/authSlice'
import { useSelector } from 'react-redux'

const SubmissionDetails = ({
  submission,
  className
}: { submission: Submission; className?: string }) => {
  const { id } = useParams()
  const user = useSelector(selectCurrentUser)

  return (
    <div className={`max-w-6xl grid prose dark:prose-invert ${className}`}>
      <div className='w-full grid grid-cols-2 grid-rows-3 gap-4 my-6'>
        {/* <h4 className='my-auto'>Submission by:</h4>
        <p className='my-auto ml-auto'>{submission.User.username}</p>

        <h4 className='my-auto'>Severity:</h4>
        <Badge
          className='ml-auto'
          variant={getBadgeVariant(submission.Severity.severity)}
        >
          {submission.Severity.severity}
        </Badge> */}
        <h4 className='my-auto'>Status:</h4>
        <Badge className='ml-auto'>{submission.status}</Badge>
      </div>
      <Separator />
      <div className='w-full'>
        <h4>Asset</h4>
        <p>{submission.asset}</p>
      </div>
      <Separator />
      <div className='w-full'>
        <h4>Evidence Report</h4>
        <Markdown className='prose dark:prose-invert h-fit min-w-full'>
          {submission.evidence}
        </Markdown>
      </div>
      <Separator />
      <div className='w-full break-words whitespace-normal'>
        <h4>Impact</h4>
        <p className=''>{submission.impact}</p>
      </div>
      <Separator />
      <div className='w-full'>
        <h4>Findings (Attached Files):</h4>
        {submission.findings.map((finding: string, index: number) => (
          <img src={finding} key={finding} alt={`File number ${index + 1}`} />
        ))}
      </div>
      <Separator />
      <div className='w-full'>
        <p>Created: {formatDate(submission.createdAt)}</p>
        <p>Last updated: {formatDate(submission.updatedAt)}</p>
      </div>
      {user?.role === 'ENTERPRISE' &&
      <div>
        <Button asChild>
          <Link
            to={`/programs/${id}/payments/new?user=${submission.userId}&bounty=${submission.bountyId}`}
          >
            Pay
          </Link>
        </Button>
      </div>
      }
    </div>
  )
}

export default SubmissionDetails
