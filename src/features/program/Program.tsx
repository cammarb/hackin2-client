import { BountiesTable } from '@/components/BountiesTable'
import { ProgramCard } from '@/components/ProgramCard'
import { RewardsTable } from '@/components/RewardsTable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetProgramByIdQuery } from '@/features/program/programSlice'
import Submissions from '@/features/submission/ProgramSubmissions'
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export default function Program() {
  const { id } = useParams()
  const {
    data: response,
    isLoading,
    isError,
    isSuccess
  } = useGetProgramByIdQuery(id)

  if (isLoading) {
    return <>Loading...</>
  }
  if (isSuccess) {
    const program = response.program
    return (
      <div key={program.id}>
        <header className='pb-10 flex flex-row items-center justify-between'>
          <h1 className='text-4xl font-medium'>{program.name}</h1>
        </header>
        <Tabs defaultValue='details'>
          <TabsList className=''>
            <TabsTrigger value='details' asChild>
              <NavLink to={'#details'}>Details</NavLink>
            </TabsTrigger>
            <TabsTrigger value='submissions' asChild>
              <NavLink to={'#submissions'}>Submissions</NavLink>
            </TabsTrigger>
            <TabsTrigger value='user-management' asChild>
              <NavLink to={'#user-management'}>User Management</NavLink>
            </TabsTrigger>
          </TabsList>

          <TabsContent id='details' value='details' className='my-10'>
            <div className='my-5 grid grid-cols-3 gap-5'>
              <ProgramCard program={program} />
              <RewardsTable programId={program.id} />
              <BountiesTable programId={program.id} />
            </div>
          </TabsContent>
          <TabsContent id='submissions' value='submissions' className='my-10'>
            {program.id && <Submissions programId={program.id} />}
          </TabsContent>
          <TabsContent
            id='user-management'
            value='user-management'
            className='my-10'
          >
            User Management
          </TabsContent>
        </Tabs>
      </div>
    )
  }
  if (isError) {
    return <>Error</>
  }
}
