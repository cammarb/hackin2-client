import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useNewPaymentMutation } from './paymentsApiSlice'
import { Input } from '@/components/ui/input'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../auth/authSlice'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useGetBountiesQuery } from '../bounty/bountyApiSlice'
import type { Bounty, BountyAssignment } from '../bounty/bounty.dto'
import { useGetBountyAssignmentsQuery } from '../assignedBounty/assignedBountyApiSlice'
import { WalletCards } from 'lucide-react'

const formSchema = z.object({
  amount: z.coerce.number(),
  bounty: z.string(),
  pentester: z.string()
})

export const CreatePaymentCard = ({
  programId,
  bountyId,
  pentesterId
}: { programId: string; bountyId?: string; pentesterId?: string }) => {
  const user = useSelector(selectCurrentUser)
  const [newPayment] = useNewPaymentMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      bounty: bountyId ? bountyId : '',
      pentester: pentesterId ? pentesterId : ''
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await newPayment({
        amount: values.amount,
        userId: values.pentester,
        programId: programId,
        companyId: user?.company?.id,
        bountyId: values.bounty
      }).unwrap()

      window.location = response.url
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Card className='max-w-xl'>
        <CardHeader>
          <CardTitle>New payment</CardTitle>
          <CardDescription>
            Enter all the required details to initiate a payment for the
            services provided by the pentester.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='bounty'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bounty Program</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a Bounty Program' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectBounty programId={programId} />
                      </SelectContent>
                    </Select>
                    <FormDescription>Select the Bounty Program</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='pentester'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pentester</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a Pentester' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {form.getValues().bounty && (
                          <SelectUser bounty={form.getValues().bounty} />
                        )}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the pentester the payment is for
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='amount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='10000' {...field} />
                    </FormControl>
                    <FormDescription>
                      Specify the amount to be payed. All payments are in € EUR.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' className='mt-6 px-8 flex gap-2 text-lg'>
                <WalletCards className='w-4 h-4' />
                Pay
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}

const SelectBounty = ({ programId }: { programId: string }) => {
  const {
    data: response,
    isLoading,
    isError,
    isSuccess
  } = useGetBountiesQuery([{ key: 'program', value: programId }])

  if (isLoading) return <p>Loading</p>
  if (isError) return <p>Error</p>
  if (isSuccess) {
    const bounties: Bounty[] = response.bounties
    return (
      <>
        {bounties.map((bounty: Bounty) => (
          <SelectItem key={bounty.id} value={bounty.id}>
            {bounty.title}
          </SelectItem>
        ))}
      </>
    )
  }
}

const SelectUser = ({ bounty }: { bounty: string }) => {
  const {
    data: response,
    isLoading,
    isError,
    isSuccess
  } = useGetBountyAssignmentsQuery({ key: 'bounty', value: bounty })

  if (isLoading) return <p>Loading</p>
  if (isError) return <p>Error</p>
  if (isSuccess) {
    const bountieAssignments: BountyAssignment[] = response.bountyAssignments
    return (
      <>
        {bountieAssignments.map((bountyAssignment: BountyAssignment) => (
          <SelectItem
            key={bountyAssignment.userId}
            value={bountyAssignment.userId}
          >
            {bountyAssignment.User?.username}
          </SelectItem>
        ))}
      </>
    )
  }
}
