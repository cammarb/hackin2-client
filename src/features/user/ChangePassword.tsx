import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useOutletContext } from 'react-router-dom'
import { useChangeUserPasswordMutation } from './userSlice'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { z, type ZodSchema } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { UserData } from './UserSettings'

type ChangeUserPasswordMutation = ReturnType<
  typeof useChangeUserPasswordMutation
>[0]

const schema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8)
})

export const ChangePassword = () => {
  const [changePassword] = useChangeUserPasswordMutation()
  const userContext = useOutletContext() as UserData

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change your password</CardTitle>
        <CardDescription>
          Please enter your previous password and then your new one.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PasswordChangeForm
          user={userContext}
          changePassword={changePassword}
          schema={schema}
        />
      </CardContent>
    </Card>
  )
}

const PasswordChangeForm = ({
  user,
  changePassword,
  schema
}: {
  user: UserData
  changePassword: ChangeUserPasswordMutation
  schema: ZodSchema
}) => {
  const form = useForm<{ currentPassword: string; newPassword: string }>({
    resolver: zodResolver(schema),
    defaultValues: {
      currentPassword: '',
      newPassword: ''
    }
  })

  const onSubmit = async (data: {
    currentPassword: string
    newPassword: string
  }) => {
    try {
      await changePassword({
        id: user.id,
        body: {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword
        }
      }).unwrap()
    } catch (error) {
      console.error('Error changing password:', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='currentPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='newPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Save</Button>
      </form>
    </Form>
  )
}
