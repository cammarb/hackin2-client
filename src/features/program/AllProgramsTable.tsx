import { useSelector } from 'react-redux'
import { useGetCompanyProgramsQuery } from './programSlice'
import { columns } from './table/columns'
import { DataTable } from './table/data-table'
import { selectCurrentUser } from '../auth/authSlice'
import { NavLink } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export const AllProgramsTable = () => {
  const user = useSelector(selectCurrentUser)
  const {
    data: response,
    isLoading,
    isError,
    isSuccess
  } = useGetCompanyProgramsQuery(user?.company?.id)

  if (isLoading) return <p>is loading</p>
  if (isError) return <p>is error</p>
  if (isSuccess) {
    const programs = response.programs
    return (
      <div>
        <div className='mb-8 flex justify-between'>
          <h1 className='text-3xl font-semibold'>All Programs</h1>
          <Button asChild>
            <NavLink to={'new'}>Create</NavLink>
          </Button>
        </div>
        <DataTable columns={columns} data={programs} />
      </div>
    )
  }
}
