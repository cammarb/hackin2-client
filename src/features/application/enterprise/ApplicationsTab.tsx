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
import { Ban, Check, MoreHorizontal, Trash } from 'lucide-react'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu'
import { Link } from 'react-router-dom'
import type { Application } from '../pentester/ApplicationsPage'
import { Badge } from '@/components/ui/badge'
import { capitalizeFirstLetter } from '@/utils/stringFormatter'
import { useGetApplicationsQuery } from '../applicationApiSlice'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useGetProgramBountiesQuery } from '@/features/program/programSlice'

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
      <>
        <div className='w-full p-2 flex gap-4 justify-end items-center'>
          Filter by:
          <Select>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='All' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filter by</SelectLabel>
                <SelectItem value='all'>All</SelectItem>
                <SelectItem value='accepted'>Accepted</SelectItem>
                <SelectItem value='rejected'>Rejected</SelectItem>
                <SelectItem value='rejected'>Pending</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Table className='mt-10'>
          <TableCaption>A list of the Program's applications.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[200px]'>User</TableHead>
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
      </>
    )
  }
}

const ApplicationRow = ({ application }: { application: Application }) => {
  const {
    data: response,
    isLoading,
    isError,
    isSuccess
  } = useGetProgramBountiesQuery(application.programId)
  const [dialogContent, setDialogContent] = useState<string | null>(null)

  return (
    <>
      <Dialog>
        <TableRow key={application.id}>
          <TableCell className='font-medium'>
            <Link to={`/profiles/${application.User.username}`}>
              {application.User.username}
            </Link>
          </TableCell>
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
                <DropdownMenuItem onClick={() => setDialogContent('accept')}>
                  <DialogTrigger className='w-full flex gap-2 items-center'>
                    Accept
                    <Check size={16} />
                  </DialogTrigger>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDialogContent('decline')}>
                  <DialogTrigger
                    content='decline'
                    className='w-full flex gap-2 items-center'
                  >
                    Decline
                    <Ban size={16} />
                  </DialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
        <DialogContent className='sm:max-w-[425px]'>
          {dialogContent === 'accept' ? (
            <>
              <DialogHeader>
                <DialogTitle>Assign a Bounty</DialogTitle>
                <DialogDescription>
                  Select the Bounty you want to assign to the user.
                  <br /> Click on Assign to save your changes.
                </DialogDescription>
              </DialogHeader>

              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='username' className='text-right'>
                  User
                </Label>
                <Input
                  id='username'
                  defaultValue={application.User.username}
                  className='col-span-3'
                  readOnly
                />
              </div>

              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='bounty' className='text-right'>
                  Bounty
                </Label>

                <Select>
                  <SelectTrigger className='col-span-3'>
                    <SelectValue placeholder='Select Bounty' />
                  </SelectTrigger>
                  <SelectContent id='bounty'>
                    <SelectGroup>
                      <SelectLabel>Bounty</SelectLabel>
                      {isSuccess && response.bounties ? (
                        response.bounties.map((bounty) => (
                          <SelectItem key={bounty.id} value={bounty.id}>
                            {bounty.id}
                          </SelectItem>
                        ))
                      ) : (
                        <>...loading</>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter>
                <Button type='submit'>Assign</Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Decline</DialogTitle>
                <DialogDescription>
                  Are you sure you want to decline this application?
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <Button type='submit' variant={'destructive'}>
                  Decline
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
