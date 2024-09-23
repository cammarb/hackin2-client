import { Button } from '@/components/ui/button'
import type { Application } from './ApplicationsTablePage'
import { useEditApplicationMutation } from './applicationApiSlice'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

export const UpdateApplicationForm = ({
  application,
  dialog
}: { application: Application; dialog: string | null }) => {
  const [updateApplication] = useEditApplicationMutation()

  const submitData = async () => {
    try {
      if (dialog === 'Accept') {
        await updateApplication({
          id: application.id,
          body: {
            user: application.userId,
            status: 'ACCEPTED',
            bountyId: application.bountyId
          }
        }).unwrap()
      } else {
        await updateApplication({
          id: application.id,
          body: {
            status: 'REJECTED'
          }
        })
      }
    } catch (error) {
      console.error('Error updating application: ', error)
    }
  }
  return (
    <DialogContent className='sm:max-w-[425px]'>
      <>
        <DialogHeader>
          <DialogTitle>{dialog}</DialogTitle>
          <DialogDescription>
            Are you sure you want to {dialog} this application?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant={dialog === 'Accept' ? 'default' : 'destructive'}
              onClick={submitData}
            >
              {dialog}
            </Button>
          </DialogClose>
        </DialogFooter>
      </>
    </DialogContent>
  )
}
