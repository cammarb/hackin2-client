import type { Payment } from './payments.dto'
import { useGetPaymentsQuery } from './paymentsApiSlice'
import { columns } from './table/columns'
import { DataTable } from './table/data-table'

export function PaymentsTable({
  queryKey,
  value,
  role
}: { queryKey: string; value: string; role: string }) {
  const {
    data: response,
    isLoading,
    isError,
    isSuccess
  } = useGetPaymentsQuery({ key: queryKey, value: value })

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (isError) {
    return <p>Error</p>
  }
  if (isSuccess) {
    if (!response.payments) return <p>No Payments yet.</p>
    const payments: Payment[] = response.payments
    return <DataTable columns={columns} data={payments} role={role} />
  }
}
