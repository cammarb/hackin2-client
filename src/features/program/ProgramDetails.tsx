import { BountiesTable } from '@/features/bounty/BountiesTable'
import { ProgramCard } from '@/components/ProgramCard'
import { RewardsTable } from '@/components/RewardsTable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetProgramByIdQuery } from '@/features/program/programSlice'
import Submissions from '@/features/submission/ProgramSubmissions'
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { ApplicationsTab } from '../application/enterprise/ApplicationsTab'

export default function ProgramDetails() {
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

        <div className='my-5 grid grid-cols-2 gap-5'>
          <ProgramCard program={program} />
          <RewardsTable programId={program.id} />
        </div>
      </div>
    )
  }
  if (isError) {
    return <>Error</>
  }
}