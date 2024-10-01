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
import { useParams, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../auth/authSlice'

const formSchema = z.object({
  amount: z.coerce.number()
})

export const CreatePaymentCard = () => {
  const user = useSelector(selectCurrentUser)
  const [searchParams] = useSearchParams()
  const pentester = searchParams.get('user')
  const { bountyId } = useParams()
  const [newPayment] = useNewPaymentMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await newPayment({
        amount: values.amount,
        userId: pentester,
        companyId: user?.company?.id,
        bountyId: bountyId
      }).unwrap()

      window.location = response.url
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>New payment</CardTitle>
          <CardDescription>
            Enter all the required details to initiate a payment for the
            services provided by the pentester.
          </CardDescription>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name='amount'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specify the amount to be payed.</FormLabel>
                      <FormControl>
                        <Input type='number' placeholder='10000' {...field} />
                      </FormControl>
                      <FormDescription>
                        All payments are in € EUR.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit'>Pay</Button>
              </form>
            </Form>
          </CardContent>
        </CardHeader>
      </Card>
    </>
  )
}
