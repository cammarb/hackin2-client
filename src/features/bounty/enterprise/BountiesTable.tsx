import { useGetBountiesQuery } from '@/features/bounty/bountyApiSlice'
import { DataTable } from '../table/data-table'
import { columns } from '../table/columns'

export function BountiesTable({ programId }: { programId: string }) {
  const {
    data: response,
    isLoading,
    isSuccess,
    isError
  } = useGetBountiesQuery({ key: 'program', value: programId })

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (isError) {
    return <p>Error</p>
  }
  if (isSuccess) {
    if (!response.bounties) return <p>No Bounties yet.</p>
    const bounties = response.bounties
    return <DataTable columns={columns} data={bounties} />
  }
}
