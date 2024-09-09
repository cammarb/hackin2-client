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

export const columns: ColumnDef<Bounty>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const title: string = row.getValue('title')
      const id: string = row.original.id
      return (
        <div className='hover:text-primary'>
          <NavLink to={`${id}`}>{title}</NavLink>
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
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy Bounty ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Bounty Page</DropdownMenuItem>
            <DropdownMenuItem>View Submissions</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
