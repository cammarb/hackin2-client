import {
  useEditBountyMutation,
  useNewBountyMutation
} from '@/features/bounty/bountyApiSlice'
import { Button } from '../../../components/ui/button'
import { capitalizeFirstLetter } from '@/utils/stringFormatter'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm, type UseFormReturn } from 'react-hook-form'
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

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  severity: z.string(),
  scope: z.string(),
  notes: z.string()
})

export const BountyForm = ({
  variant,
  programId,
  bounty
}: { programId: string; variant: 'create' | 'edit'; bounty?: Bounty }) => {
  const {
    data: response,
    isLoading,
    isError,
    isSuccess
  } = useGetSeverityRewardsQuery({ key: 'program', value: programId })
  const [addBounty] = useNewBountyMutation()
  const [editBounty] = useEditBountyMutation()

  let form: UseFormReturn<z.infer<typeof formSchema>> = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      severity: '',
      scope: '',
      notes: ''
    }
  })

  if (variant === 'edit' && bounty && isSuccess) {
    form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: bounty.title,
        description: bounty.description,
        severity: bounty.severityRewardId,
        scope: bounty.scope,
        notes: bounty.notes
      }
    })
  }

  const submitData = async (data: z.infer<typeof formSchema>) => {
    try {
      if (variant === 'edit') {
        console.log('before editing')
        await editBounty({
          id: bounty?.id,
          body: {
            programId: programId,
            title: data.title,
            description: data.description,
            severityRewardId: data.severity,
            scope: data.scope,
            notes: data.notes
          }
        }).unwrap()
        console.log('after editing')
      }
      if (variant === 'create') {
        await addBounty({
          programId: programId,
          title: data.title,
          description: data.description,
          severityRewardId: data.severity,
          scope: data.scope,
          notes: data.notes
        }).unwrap()
      }
    } catch (error) {
      console.error(`Error ${variant} bounty:`, error)
    }
  }

  return (
    <DialogContent className='sm:max-w-[425px] sm:max-h-screen'>
      <DialogHeader>
        <DialogTitle>{capitalizeFirstLetter(variant)} Bounty</DialogTitle>
        <DialogDescription>
          {capitalizeFirstLetter(variant)} your bounty here. Click save when
          you're done.
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
