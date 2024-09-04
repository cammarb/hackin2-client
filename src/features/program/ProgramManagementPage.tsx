import { useGetProgramByIdQuery } from '@/features/program/programSlice'
import { ProgramManagement } from './ProgramManagement'
import { findCookie } from '@/utils/cookieFinder'
import { useParams } from 'react-router-dom'

export default function ProgramManagementPage() {
  const layout = findCookie('react-resizable-panels:layout')
  const collapsed = findCookie('react-resizable-panels:collapsed')

  const defaultLayout = layout ? JSON.parse(layout) : undefined
  const defaultCollapsed = collapsed ? JSON.parse(collapsed) : undefined

  const { id } = useParams()

  const {
    data: response,
    isLoading,
    isSuccess,
    isError
  } = useGetProgramByIdQuery(id)

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error</p>
  if (isSuccess) {
    const program = response.program
    return (
      <ProgramManagement
        program={program}
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
      />
    )
  }
}
