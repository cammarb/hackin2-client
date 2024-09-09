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
import { Ban, Check, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu'
import { Link, useParams } from 'react-router-dom'
import type { Application } from '../pentester/ApplicationsPage'
import { Badge } from '@/components/ui/badge'
import { capitalizeFirstLetter } from '@/utils/stringFormatter'
import {
  useEditApplicationMutation,
  useGetApplicationsQuery
} from '../applicationApiSlice'
import { useGetProgramByIdQuery } from '@/features/program/programSlice'
import { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import {
  useGetBountiesQuery,
  useGetBountyByIdQuery
} from '@/features/bounty/bountyApiSlice'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export const ApplicationsTab = () => {
  const { id } = useParams()
  const {
    data: response,
    isLoading,
    isError,
    isSuccess
  } = useGetApplicationsQuery({ key: 'program', value: id })

  if (isLoading) return <p>is loading</p>
  if (isError) return <p>is error</p>
  if (isSuccess) {
    const applications = response.applications
    return (
      <>
        <div className='my-7 font-semibold text-2xl'>Applications</div>
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
      </>
    )
  }
}

const ApplicationRow = ({ application }: { application: Application }) => {
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
        <UpdateApplicationForm
          application={application}
          dialog={dialogContent}
        />
      </Dialog>
    </>
  )
}

const formSchema = z.object({
  bountyId: z.string()
})

export const UpdateApplicationForm = ({
  application,
  dialog
}: { application: Application; dialog: string }) => {
  const {
    data: response,
    isLoading,
    isError,
    isSuccess
  } = useGetBountiesQuery({ key: 'program', value: application.programId })
  const [updateApplication] = useEditApplicationMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bountyId: ''
    }
  })

  const submitData = async (data: z.infer<typeof formSchema>) => {
    try {
      if (dialog === 'accept') {
        await updateApplication({
          id: application.id,
          body: {
            user: application.userId,
            status: 'ACCEPTED',
            bountyId: data.bountyId
          }
        }).unwrap()
      } else {
        await updateApplication({
          id: application.id,
          body: {
            status: 'REJECTED'
          }
        })
      }
    } catch (error) {
      console.error('Error updating application: ', error)
    }
  }
  return (
    <DialogContent className='sm:max-w-[425px]'>
      {dialog === 'accept' ? (
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

          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitData)}>
              <FormField
                control={form.control}
                name='bountyId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='bountyId'>Bounty</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className='col-span-3'>
                          <SelectValue placeholder='Select Bounty' />
                        </SelectTrigger>
                        <SelectContent id='bounty'>
                          <SelectGroup>
                            <SelectLabel>Bounty</SelectLabel>
                            {isSuccess && response.bounties ? (
                              response.bounties.map((bounty) => (
                                <SelectItem key={bounty.id} value={bounty.id}>
                                  {bounty.title}
                                </SelectItem>
                              ))
                            ) : (
                              <>...loading</>
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button type='submit'>Assign</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
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
            <DialogClose asChild>
              <Button type='submit' variant={'destructive'}>
                Decline
              </Button>
            </DialogClose>
          </DialogFooter>
        </>
      )}
    </DialogContent>
  )
}
