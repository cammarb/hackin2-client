import { selectCurrentUser } from '@/features/auth/authSlice'
import { useSelector } from 'react-redux'
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { useGetSubmissionsByUserQuery } from '@/features/submission/submissionSlice'
import type { Submission } from '@/utils/types'

const SubmissionsList = () => {
  const user = useSelector(selectCurrentUser)
  const {
    data: response,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetSubmissionsByUserQuery(user?.id)

  let content = <></>

  if (isSuccess) {
    const submissions = response.submissions

    content = (
      <div className='grid gap-10'>
        <Table>
          <TableCaption>A list of your submissions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Bounty</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead className='text-right'>Files sent</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission: Submission) => (
              <TableRow key={submission.id}>
                <TableCell className='font-medium'>
                  {/* {submission.Program.name} */}
                </TableCell>
                <TableCell>{submission.status}</TableCell>
                {/* <TableCell>{submission.Severity.severity}</TableCell> */}
                <TableCell className='text-right'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup='true' size='icon' variant='ghost'>
                        <MoreHorizontal className='h-4 w-4' />
                        <span className='sr-only'>Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuLabel>View Files</DropdownMenuLabel>
                      {submission.findings.map((url: string, index: number) => (
                        <DropdownMenuItem key={url}>
                          <Link to={url} className='w-full'>
                            File {index + 1}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  } else {
    content = <p>no submissions or error</p>
  }

  return (
    <>
      <main className='m-10 flex flex-col gap-10 mx-auto sm:w-[100%] md:w-[80%] lg:w-[60%]'>
        <h1 className='text-2xl font-medium'>Submissions</h1>
        {content}
      </main>
    </>
  )
}

export default SubmissionsList
