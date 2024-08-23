import { Skeleton } from '@/components/ui/skeleton'
import { useGetApplicationsQuery } from './applicationApiSlice'
import { ApplicationsTable } from './pentester/ApplicationsTable'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../auth/authSlice'

export type Application = {
  id: string
  userId: string
  status: string
  programId: string
  createdAt: string
  updatedAt: string
  Program: {
    name: string
  }
  User: {
    id: string
    username: string
  }
  bounty?: string
}

export const ApplicationsPage = () => {
  const user = useSelector(selectCurrentUser)
  const {
    data: response,
    isLoading,
    isError,
    isSuccess
  } = useGetApplicationsQuery({ key: 'user', value: user?.id })

  if (isLoading) return <Skeleton className='h-4 w-[250px]' />
  if (isError) return <p>Error</p>
  if (isSuccess) {
    const applications: Application[] = response.applications
    return (
      <main className='m-10 flex flex-col gap-10 mx-auto sm:w-[100%] md:w-[80%] lg:w-[60%]'>
        <h1 className='text-2xl font-medium'>Applications</h1>
        <ApplicationsTable applications={applications} />
      </main>
    )
  }
}
