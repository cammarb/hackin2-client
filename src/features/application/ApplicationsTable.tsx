import { DataTable } from './table/data-table'
import { columns } from './table/columns'
import { useGetApplicationsQuery } from './applicationApiSlice'

export function ApplicationsTable({
  queryKey,
  value,
  role
}: { queryKey: string; value: string; role: string }) {
  const {
    data: response,
    isLoading,
    isSuccess,
    isError
  } = useGetApplicationsQuery({ key: queryKey, value: value })

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (isError) {
    return <p>Error</p>
  }
  if (isSuccess) {
    if (!response.applications) return <p>No Applications yet.</p>
    const applications = response.applications
    return <DataTable columns={columns} data={applications} role={role} />
  }
}
