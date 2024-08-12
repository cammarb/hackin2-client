import { selectCurrentCompany } from '@/features/auth/authSlice'
import { useGetCompanyProgramsQuery } from '@/features/program/programSlice'
import { useSelector } from 'react-redux'
import { ProgramManagement } from './ProgramManagement'
import { findCookie } from '@/utils/cookieFinder'

export default function ProgramManagementPage() {
  const layout = findCookie('react-resizable-panels:layout')
  const collapsed = findCookie('react-resizable-panels:collapsed')

  const defaultLayout = layout ? JSON.parse(layout) : undefined
  const defaultCollapsed = collapsed ? JSON.parse(collapsed) : undefined

  const company = useSelector(selectCurrentCompany)
  const {
    data: response,
    isLoading,
    isSuccess,
    isError
  } = useGetCompanyProgramsQuery(company)

  let programs = null

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error</p>
  if (isSuccess) {
    programs = response.programs
    return (
      <ProgramManagement
        programs={programs}
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
      />
    )
  }
}
