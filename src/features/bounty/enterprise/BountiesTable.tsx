import {
  useGetBountiesQuery,
  useNewBountyMutation
} from '@/features/bounty/bountyApiSlice'
import { useParams } from 'react-router-dom'
import { Button } from '../../../components/ui/button'
import { capitalizeFirstLetter } from '@/utils/stringFormatter'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import { useGetSeverityRewardsQuery } from '../../severityReward/severityRewardSlice'
import { DataTable } from '../table/data-table'
import { columns } from '../table/columns'

export function BountiesTable({ programId }: { programId: string }) {
  const {
    data: response,
    isLoading,
    isSuccess,
    isError
  } = useGetBountiesQuery({ key: 'program', value: programId })

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (isError) {
    return <p>Error</p>
  }
  if (isSuccess) {
    if (!response.bounties) return <p>No Bounties yet.</p>
    const bounties = response.bounties
    return <DataTable columns={columns} data={bounties} />
  }
}

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  severity: z.string(),
  scope: z.string(),
  notes: z.string()
})

export const BountyForm = ({ programId }: { programId: string }) => {
  const {
    data: response,
    isLoading,
    isError,
    isSuccess
  } = useGetSeverityRewardsQuery({ key: 'program', value: programId })
  const [addBounty] = useNewBountyMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      severity: '',
      scope: '',
      notes: ''
    }
  })
  const submitData = async (data: z.infer<typeof formSchema>) => {
    try {
      await addBounty({
        programId: programId,
        title: data.title,
        description: data.description,
        severityRewardId: data.severity,
        scope: data.scope,
        notes: data.notes
      }).unwrap()
    } catch (error) {
      console.error('Error updating program:', error)
    }
  }

  return (
    <DialogContent className='sm:max-w-[425px] sm:max-h-screen'>
      <DialogHeader>
        <DialogTitle>Create Bounty</DialogTitle>
        <DialogDescription>
          Create your bounty here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitData)}
          className='px-2 grid gap-3 max-h-[80vh] overflow-y-auto'
        >
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder='Bounty title' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder='Bounty description' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='severity'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='severity'>Severity</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id='severity' aria-label='Select severity'>
                      <SelectValue
                        placeholder={'Select a severity'}
                        {...field}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoading && (
                        <SelectItem value={'loading'}>Loading...</SelectItem>
                      )}
                      {isError && (
                        <SelectItem value={'error'}>
                          Error loading severities
                        </SelectItem>
                      )}
                      {isSuccess &&
                        response.severityRewards.map(
                          (severityReward: {
                            id: string
                            severity: string
                          }) => (
                            <SelectItem
                              key={severityReward.id}
                              value={severityReward.id}
                            >
                              {capitalizeFirstLetter(severityReward.severity)}
                            </SelectItem>
                          )
                        )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='scope'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Scope</FormLabel>
                <FormControl>
                  <Input
                    placeholder='e.g Physical barriers (locks, gates)'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='notes'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea placeholder='e.g Terms and conditions' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className='mt-4'>
            <DialogClose asChild>
              <Button type='submit'>Save</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
