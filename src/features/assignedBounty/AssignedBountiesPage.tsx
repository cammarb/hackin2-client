import Breadcrumbs from '@/components/Breadcrumb'
import { Outlet } from 'react-router-dom'

export const AssignedBountiesPage = () => {
  return (
    <div className='max-w-6xl mx-auto grid gap-4'>
      <h3 className='text-2xl font-semibold'>Assigned Bounties</h3>
      <Breadcrumbs root='assigned-bounties' rootTitle='Bounties Table' />
      <Outlet />
    </div>
  )
}
