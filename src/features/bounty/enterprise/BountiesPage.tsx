import { Outlet, useLocation, useParams } from 'react-router-dom'
import { BountyForm } from './BountiesTable'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Breadcrumbs from '@/components/Breadcrumb'

export const BountiesPage = () => {
  const { id } = useParams()
  const root = 'bounties'
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)
  const isRoot = pathnames[pathnames.length - 1] === root

  return (
    <div>
      <div className='mb-8 flex gap-8'>
        <h1 className='text-3xl font-semibold'>Bounties</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Bounty</Button>
          </DialogTrigger>
          {id && <BountyForm programId={id} />}
        </Dialog>
      </div>
      <div>
        {!isRoot && <Breadcrumbs root={root} />}
        <Outlet context={id} />
      </div>
    </div>
  )
}
