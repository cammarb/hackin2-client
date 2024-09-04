import { ProgramCard } from '@/components/ProgramCard'
import { RewardsTable } from '@/components/RewardsTable'
import { useGetProgramByIdQuery } from '@/features/program/programSlice'
import { useParams } from 'react-router-dom'

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

        <div className='my-5 grid gap-5 lg:grid-cols-2'>
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
