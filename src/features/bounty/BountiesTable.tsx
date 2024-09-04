import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  useGetBountiesQuery,
  useNewBountyMutation
} from '@/features/bounty/bountyApiSlice'
import { Link, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '../../components/ui/card'
import { capitalizeFirstLetter } from '@/utils/stringFormatter'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { useGetSeverityRewardsQuery } from '../severityReward/severityRewardSlice'

export function BountiesTable() {
  const { id } = useParams()
  const {
    data: response,
    isLoading,
    isSuccess,
    isError
  } = useGetBountiesQuery({ key: 'program', value: id })

  // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
  let content
  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isError) {
    content = <p>Error</p>
  } else if (isSuccess) {
    if (!response.bounties) content = <p>No Bounties yet.</p>
    else {
      const bounties = response.bounties
      content = (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Title</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bounties.map((bounty: Bounty) => (
              <TableRow key={bounty.id}>
                <TableCell>{bounty.title}</TableCell>
                <TableCell>{capitalizeFirstLetter(bounty.status)}</TableCell>
                <TableCell>{bounty.description}</TableCell>
                {/* <TableCell>{bounty.requirements}</TableCell> */}
                {/* <TableCell>{bounty.rules}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )
    }
  }

  return (
    <Card className='col-span-3'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle>Bounties</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline'>Add Bounty</Button>
          </DialogTrigger>

          <BountyForm programId={id} />
        </Dialog>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  )
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
  const submitData = async (data: any) => {
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
    <DialogContent className='sm:max-w-[425px]'>
      <DialogHeader>
        <DialogTitle>Create Bounty</DialogTitle>
        <DialogDescription>
          Create your bounty here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitData)}>
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
                <FormLabel htmlFor='status'>Status</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id='status' aria-label='Select severity'>
                      <SelectValue placeholder={'Select a status'} {...field} />
                    </SelectTrigger>
                    <SelectContent>
                      {response.severityRewards.map((severityReward) => (
                        <SelectItem
                          key={severityReward.id}
                          value={severityReward.id}
                        >
                          {capitalizeFirstLetter(severityReward.severity)}
                        </SelectItem>
                      ))}
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
                  <Input placeholder='e.g Terms and conditions' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className='mt-4'>
            <Button type='submit'>Save</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
