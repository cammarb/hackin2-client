import { useGetSubmissionsByProgramQuery } from '@/features/submission/submissionSlice'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { getBadgeVariant } from '@/components/RewardsTable'
import { Badge } from '@/components/ui/badge'
import type { Submission } from '@/utils/types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { ProgramSubmissionUpdate } from './ProgramSubmissionUpdate'

const Submissions = ({ programId }: { programId: string | undefined }) => {
  const {
    data: response,
    isLoading,
    isError,
    isSuccess
  } = useGetSubmissionsByProgramQuery(programId)

  return (
    <div>
      <Table>
        <TableCaption>A list of all the program submissions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Asset</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isSuccess ? (
            response.submissions.map((submission: Submission) => (
              <TableRow key={submission.id}>
                {/* <TableCell className='font-medium'>
                  {submission.User.username}
                </TableCell>
                <TableCell>
                  <Badge>{submission.status}</Badge>
                </TableCell>
                <TableCell>{submission.asset}</TableCell>
                <TableCell>
                  <Badge
                    variant={getBadgeVariant(submission.Severity.severity)}
                  >
                    {submission.Severity.severity}
                  </Badge>
                </TableCell> */}
                <TableCell>
                  <Dialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup='true'
                          size='icon'
                          variant='ghost'
                        >
                          <MoreHorizontal className='h-4 w-4' />
                          <span className='sr-only'>Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <Link to={`submissions/${submission.id}`}>
                          <DropdownMenuItem>View</DropdownMenuItem>
                        </Link>
                        <DialogTrigger asChild>
                          <DropdownMenuItem>Update</DropdownMenuItem>
                        </DialogTrigger>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent className='sm:max-w-[425px]'>
                      <ProgramSubmissionUpdate
                        submissionId={submission.id}
                        submissionStatus={submission.status}
                      />
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))
          ) : isLoading ? (
            <>Loading...</>
          ) : isError ? (
            <>Error</>
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default Submissions
