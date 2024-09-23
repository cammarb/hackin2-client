import { Badge } from '@/components/ui/badge'
import { formatDateTime } from '@/utils/dateFormatter'
import type { ColumnDef } from '@tanstack/react-table'
import { NavLink, useParams } from 'react-router-dom'
import { ArrowUpDown, Ban, Check, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { capitalizeFirstLetter } from '@/utils/stringFormatter'
import type { Application } from '../pentester/ApplicationsPage'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { UpdateApplicationForm } from '../enterprise/ApplicationUpdateForm'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const columns: ColumnDef<Application>[] = [
  {
    accessorFn: (row) => row.Bounty.title,
    id: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Bounty
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const application: Application = row.original
      return (
        <div className='hover:text-primary'>
          <NavLink
            to={`/programs/${application.Bounty.programId}/bounties/${application.bountyId}`}
          >
            {application.Bounty.title}
          </NavLink>
        </div>
      )
    }
  },
  {
    accessorFn: (row) => row.User.username,
    id: 'username',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          User
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const user: string = row.getValue('username')
      return (
        <div className='hover:text-primary'>
          <NavLink to={`${user}`}>{user}</NavLink>
        </div>
      )
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status: string = row.getValue('status')
      let variant: 'draft' | 'destructive' | 'complete' | null | undefined
      switch (status) {
        case 'PENDING': {
          variant = 'draft'
          break
        }
        case 'REJECTED': {
          variant = 'destructive'
          break
        }
        case 'ACCEPTED': {
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
    accessorKey: 'createdAt',
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
      const formattedDate = formatDateTime(row.getValue('createdAt'))
      return <div>{formattedDate}</div>
    }
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className=''
        >
          Updated At
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const formattedDate = formatDateTime(row.getValue('updatedAt'))
      return <div>{formattedDate}</div>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const application = row.original

      const [dialogContent, setDialogContent] = useState<string | null>(null)

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
              {application.status === 'ACCEPTED' ? (
                <DropdownMenuItem asChild>
                  <Link
                    to={`/programs/${application.Bounty.programId}/bounties/${application.bountyId}`}
                  >
                    View Bounty
                  </Link>
                </DropdownMenuItem>
              ) : (
                <>
                  {' '}
                  <DropdownMenuItem onClick={() => setDialogContent('Accept')}>
                    <DialogTrigger className='w-full flex gap-2 items-center'>
                      Accept
                      <Check size={16} />
                    </DialogTrigger>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDialogContent('Decline')}>
                    <DialogTrigger
                      content='decline'
                      className='w-full flex gap-2 items-center'
                    >
                      Decline
                      <Ban size={16} />
                    </DialogTrigger>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
            <UpdateApplicationForm
              application={application}
              dialog={dialogContent}
            />
          </DropdownMenu>
        </Dialog>
      )
    }
  }
]
