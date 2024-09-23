import { Building2, MapIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card'

import { Link } from 'react-router-dom'
import type { Program } from '@/utils/types'
import { formatDate } from '@/utils/dateFormatter'

export const ProgramCardView = ({ program }: { program: Program }) => {
  return (
    <Card>
      <CardHeader className='grid grid-cols-[1fr_110px] items-start gap-4 space-y-0'>
        <div className='space-y-1'>
          <CardTitle>
            <Link
              to={`/bounty-programs/${program.id}`}
              className='hover:underline underline-offset-4'
            >
              {program.name}
            </Link>
          </CardTitle>
          <CardDescription>{program.description} </CardDescription>
        </div>
        <Button asChild>
          <Link to={program.id}>View</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className='flex space-x-4 text-sm text-muted-foreground'>
          <div className='flex items-center'>
            <Building2 className='mr-1 h-3 w-3 text-sky-400' />
            {program.Company.name}
          </div>
          <div className='flex items-center'>
            <MapIcon className='mr-1 h-3 w-3' />
            {program.location}{' '}
          </div>
          <div>Last updated: {formatDate(program.updatedAt)}</div>
        </div>
      </CardContent>
    </Card>
  )
}
