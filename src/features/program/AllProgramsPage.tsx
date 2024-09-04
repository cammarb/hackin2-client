import { Outlet } from 'react-router-dom'

export const AllProgramsPage = () => {
  return (
    <div className='mx-auto grid w-full max-w-6xl'>
      <Outlet />
    </div>
  )
}
