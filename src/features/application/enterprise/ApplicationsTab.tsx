import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { formatDate } from '@/utils/dateFormatter'
import {
  DropdownMenu,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu'
import { Link } from 'react-router-dom'
import type { Application } from '../ApplicationsPage'
import { Badge } from '@/components/ui/badge'
import { capitalizeFirstLetter } from '@/utils/stringFormatter'
import { useGetApplicationsQuery } from '../applicationApiSlice'

export const ApplicationsTab = ({ program }: { program: string }) => {
  const {
    data: response,
    isLoading,
    isError,
    isSuccess
  } = useGetApplicationsQuery({ key: 'program', value: program })

  if (isLoading) return <p>is loading</p>
  if (isError) return <p>is error</p>
  if (isSuccess) {
    const applications = response.applications
    return (
      <Table>
        <TableCaption>A list of the Program's applications.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[200px]'>Program</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application: Application) => (
            <ApplicationRow application={application} key={application.id} />
          ))}
        </TableBody>
      </Table>
    )
  }
}

const ApplicationRow = ({ application }: { application: Application }) => {
  return (
    <TableRow key={application.id}>
      <TableCell className='font-medium'>{application.User.username}</TableCell>
      <TableCell>
        <Badge>{capitalizeFirstLetter(application.status)}</Badge>
      </TableCell>
      <TableCell>{formatDate(application.createdAt)}</TableCell>
      <TableCell>{formatDate(application.updatedAt)}</TableCell>
      <TableCell className='text-right'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup='true' size='icon' variant='outline'>
              <MoreHorizontal className='h-4 w-4' />
              <span className='sr-only'>Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link
                to={`/bounty-programs/${application.programId}`}
                className='w-full'
              >
                View
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link to={`/bounties/${application.bounty}`} className='w-full'>
                Go to Bounty
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}
