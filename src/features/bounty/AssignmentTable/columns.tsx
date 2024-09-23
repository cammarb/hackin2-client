import { Badge } from '@/components/ui/badge'
import { formatDateTime } from '@/utils/dateFormatter'
import type { ColumnDef } from '@tanstack/react-table'
import { NavLink } from 'react-router-dom'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { capitalizeFirstLetter } from '@/utils/stringFormatter'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import SubmissionDetails from '@/features/submission/SubmissionDetails'
import type { BountyAssignment } from '../bounty.dto'
import { Separator } from '@/components/ui/separator'

export const columns: ColumnDef<BountyAssignment>[] = [
  {
    accessorFn: (row) => (row.User ? row.User.username : row.Bounty?.title),
    id: 'usernameOrBounty',
    header: ({ column, table }) => {
      const firstRow = table.getPreSortedRowModel().rows[0]?.original
      const headerTitle = firstRow?.User ? 'User' : 'Bounty'

      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {headerTitle}
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const usernameOrBounty: string = row.getValue('usernameOrBounty')
      const bountyId: string = row.original.bountyId
      return (
        <div className='hover:text-primary'>
          <NavLink to={`${bountyId}`}>{usernameOrBounty}</NavLink>
        </div>
      )
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status: string = row.getValue('status')
      let variant: 'draft' | 'active' | 'complete' | null | undefined
      switch (status) {
        case 'PENDING': {
          variant = 'draft'
          break
        }
        case 'IN_PROGRESS': {
          variant = 'active'
          break
        }
        case 'DONE': {
          variant = 'complete'
          break
        }
      }
      return (
        <div>
          <Badge variant={variant}>{capitalizeFirstLetter(status)}</Badge>
        </div>
      )
    }
  },
  {
    accessorKey: 'assignedAt',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Created At
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const formattedDate = formatDateTime(row.getValue('assignedAt'))
      return <div>{formattedDate}</div>
    }
  },
  {
    accessorKey: 'payment',
    header: 'Payment',
    cell: ({ row }) => {
      const status: string = row.getValue('status')
      let variant: 'draft' | 'active' | 'complete' | null | undefined
      switch (status) {
        case 'PENDING': {
          variant = 'draft'
          break
        }
        case 'IN_PROGRESS': {
          variant = 'active'
          break
        }
        case 'DONE': {
          variant = 'complete'
          break
        }
      }
      return (
        <div>
          <Badge variant={variant}>{capitalizeFirstLetter(status)}</Badge>
        </div>
      )
    }
  },
  {
    accessorKey: 'Submission',
    id: 'actions',
    cell: ({ row }) => {
      const submission = row.original.Submission
      if (submission)
        return (
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='h-8 w-8 p-0'>
                  <span className='sr-only'>Open menu</span>
                  <MoreHorizontal className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DialogTrigger asChild>
                  <DropdownMenuItem>View Submission</DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className='max-w-6xl p-10 sm:max-h-screen'>
              <DialogHeader>
                <DialogTitle>Submission Details</DialogTitle>
                <DialogDescription>
                  Submission report by the user.
                </DialogDescription>
              </DialogHeader>
              <Separator />
              <SubmissionDetails
                submission={submission}
                className={'max-h-[80vh] overflow-y-auto'}
              />
            </DialogContent>
          </Dialog>
        )
    }
  }
]
