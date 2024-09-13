import { Button } from '@/components/ui/button'
import type { Application } from '../pentester/ApplicationsPage'
import { useEditApplicationMutation } from '../applicationApiSlice'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { useGetBountiesQuery } from '@/features/bounty/bountyApiSlice'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  bountyId: z.string()
})

export const UpdateApplicationForm = ({
  application,
  dialog
}: { application: Application; dialog: string | null }) => {
  const {
    data: response,
    isLoading,
    isSuccess
  } = useGetBountiesQuery({ key: 'program', value: application.programId })
  const [updateApplication] = useEditApplicationMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bountyId: ''
    }
  })

  const submitData = async (data: z.infer<typeof formSchema>) => {
    try {
      if (dialog === 'accept') {
        await updateApplication({
          id: application.id,
          body: {
            user: application.userId,
            status: 'ACCEPTED',
            bountyId: data.bountyId
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
      {dialog === 'accept' ? (
        <>
          <DialogHeader>
            <DialogTitle>Assign a Bounty</DialogTitle>
            <DialogDescription>
              Select the Bounty you want to assign to the user.
              <br /> Click on Assign to save your changes.
            </DialogDescription>
          </DialogHeader>

          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='username' className='text-right'>
              User
            </Label>
            <Input
              id='username'
              defaultValue={application.User.username}
              className='col-span-3'
              readOnly
            />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitData)}>
              <FormField
                control={form.control}
                name='bountyId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='bountyId'>Bounty</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className='col-span-3'>
                          <SelectValue placeholder='Select Bounty' />
                        </SelectTrigger>
                        <SelectContent id='bounty'>
                          <SelectGroup>
                            <SelectLabel>Bounty</SelectLabel>
                            {isSuccess && response.bounties ? (
                              response.bounties.map(
                                (bounty: { id: string; title: string }) => (
                                  <SelectItem key={bounty.id} value={bounty.id}>
                                    {bounty.title}
                                  </SelectItem>
                                )
                              )
                            ) : isLoading ? (
                              <>...loading</>
                            ) : (
                              <>Error</>
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button type='submit'>Assign</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </>
      ) : (
        <>
          <form onSubmit={form.handleSubmit(submitData)}>
            <DialogHeader>
              <DialogTitle>Decline</DialogTitle>
              <DialogDescription>
                Are you sure you want to decline this application?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <DialogClose asChild>
                <Button type='submit' variant={'destructive'}>
                  Decline
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </>
      )}
    </DialogContent>
  )
}
