import { formatDate } from '@/utils/dateFormatter'
import { useGetApplicationsQuery } from './applicationApiSlice'

export type Application = {
  id: string
  userId: string
  status: string
  createdAt: string
  updatedAt: string
  Program: {
    name: string
  }
}

export const ApplicationsPage = () => {
  const {
    data: response,
    isLoading,
    isError,
    isSuccess
  } = useGetApplicationsQuery({})

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error</p>
  if (isSuccess) {
    const applications: Application[] = response.applications
    return (
      <div>
        {applications.map((application: Application) => (
          <div key={application.id}>
            <p>{application.Program.name}</p>
            <p>{application.status}</p>
            <p>{formatDate(application.createdAt)}</p>
            <p>{formatDate(application.updatedAt)}</p>
          </div>
        ))}
      </div>
    )
  }
}
