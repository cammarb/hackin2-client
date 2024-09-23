import { Badge } from '@/components/ui/badge'
import { formatDateTime } from '@/utils/dateFormatter'
import type { Program } from '@/utils/types'
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

export const columns: ColumnDef<Program>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const name: string = row.getValue('name')
      const id: string = row.original.id
      return (
        <div className='hover:text-primary'>
          <NavLink to={`/programs/${id}`}>{name}</NavLink>
        </div>
      )
    }
  },
  {
    accessorKey: 'programStatus',
    header: 'Status',
    cell: ({ row }) => {
      const status: string = row.getValue('programStatus')
      let variant: 'draft' | 'active' | 'paused' | 'complete' | null | undefined
      switch (status) {
        case 'DRAFT': {
          variant = 'draft'
          break
        }
        case 'ACTIVE': {
          variant = 'active'
          break
        }
        case 'PAUSED': {
          variant = 'paused'
          break
        }
        case 'COMPLETE': {
          variant = 'complete'
          break
        }
      }
      return (
        <div>
          <Badge variant={variant}>{status}</Badge>
        </div>
      )
    }
  },
  {
    accessorKey: 'location',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Location
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
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
    header: 'Updated At',
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
              Copy Program ID
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
