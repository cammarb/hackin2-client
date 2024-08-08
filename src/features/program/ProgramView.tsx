import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { useGetProgramByIdQuery } from '@/features/program/programSlice'
import type { Program } from '@/utils/types'
import { Separator } from '@/components/ui/separator'
import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Globe, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/utils/dateFormatter'

export default function ProgramView() {
  const { id } = useParams()
  const {
    data: response,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetProgramByIdQuery(id)

  let program: Program

  if (isLoading) return <>Loading...</>
  if (isSuccess) {
    program = response.program
    return (
      <main className='m-10 flex flex-col gap-10'>
        <Card
          className='mx-auto sm:w-[100%] md:w-[80%] lg:w-[60%]'
          key={program.id}
        >
          <CardHeader>
            <div className='flex justify-between'>
              <div>
                <CardTitle className='text-xl'>{program.name}</CardTitle>
                <p className='text-base font-semibold'>
                  by {program.Company.name}
                </p>
              </div>
              <Button variant={'secondary'}>{program.programStatus}</Button>
            </div>
            <div className='text-sm'>
              <div className='flex my-2 gap-2'>
                <MapPin size={18} />
                {program.location}
              </div>

              <Button variant={'link'} className='p-0'>
                <Link
                  to={`https://${program.Company.website}`}
                  className='flex gap-2'
                >
                  <Globe size={18} />
                  {program.Company.website}
                </Link>
              </Button>
            </div>
            <div className='h-5 text-sm flex gap-5'>
              <div>Created: {formatDate(program.createdAt)}</div>
              <Separator orientation='vertical' />
              <div>Updated: {formatDate(program.updatedAt)}</div>
            </div>
          </CardHeader>

          <CardContent>
            <div className='mb-8 grid gap-3'>
              <p className='text-sm font-medium'>Description</p>
              {program.description}
            </div>

            <div className='space-y-1'>
              <h4 className='text-sm font-medium leading-none'>
                Severity Rewards (€)
              </h4>
            </div>
            <Separator className='my-4' />
            <div className='flex h-14 items-center space-x-10 text-sm'>
              {program.SeverityReward.map(
                (severity: {
                  severity: string
                  min: string
                  max: string
                }) => (
                  <div key={severity.severity}>
                    <div className='flex flex-col gap-2 justify-center align-middle items-center'>
                      <Badge variant={'secondary'}>{severity.severity}</Badge>
                      <div>
                        {severity.min} - {severity.max}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link to={`/bounty-programs/${program.id}/submit/new`}>
                Submit report
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    )
  }
  if (isError) return <>{error}</>
}
