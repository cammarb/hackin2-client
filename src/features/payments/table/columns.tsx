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
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { capitalizeFirstLetter, centsToEuros } from '@/utils/stringFormatter'
import { Link } from 'react-router-dom'
import type { Payment } from '../payments.dto'

export const columns: ColumnDef<Payment>[] = [
  {
    accessorFn: (row) => row.BountyAssignment.Bounty.title,
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
      const payment: Payment = row.original
      return (
        <div className='hover:text-primary'>
          <NavLink
            to={`/programs/${payment.programId}/bounties/${payment.bountyId}`}
          >
            {payment.BountyAssignment.Bounty.title}
          </NavLink>
        </div>
      )
    }
  },
  {
    accessorFn: (row) => row.BountyAssignment.User.username,
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
    accessorKey: 'amount',
    header: 'Amount (€)',
    cell: ({ row }) => {
      const amount = row.getValue('amount') as string
      return <div>{centsToEuros(amount)}</div>
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status: string = row.getValue('status')
      let variant: 'draft' | 'complete' | null | undefined
      switch (status) {
        case 'PENDING': {
          variant = 'draft'
          break
        }
        case 'PAYED': {
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
    accessorKey: 'payedAt',
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
      const formattedDate = formatDateTime(row.getValue('payedAt'))
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
            {payment.status === 'PAYED' ? (
              <DropdownMenuItem asChild>
                <Link
                  to={`/programs/${payment.programId}/payments/${payment.stripeCheckoutId}`}
                >
                  View Payment
                </Link>
              </DropdownMenuItem>
            ) : (
              <></>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
