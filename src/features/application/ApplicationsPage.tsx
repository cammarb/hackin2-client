import { Outlet, useLocation, useParams } from 'react-router-dom'
import Breadcrumbs from '@/components/Breadcrumb'

export const ApplicationsPage = () => {
  const { id } = useParams()
  const root = 'applications'
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)
  const isRoot = pathnames[pathnames.length - 1] === root

  return (
    <div className='max-w-6xl mx-auto'>
      <div className='mb-8 flex gap-8'>
        <h1 className='text-3xl font-semibold'>Applications</h1>
      </div>
      <div>
        {!isRoot && <Breadcrumbs root={root} />}
        <Outlet context={id} />
      </div>
    </div>
  )
}
