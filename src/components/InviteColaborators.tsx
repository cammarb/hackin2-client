'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

const formSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address'
  })
})

export function InviteCollaboratorForm() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Send the email to the server
      // Should be something like:
      // await fetch('/api/invite-collaborator', {
      //   method: 'POST',
      //   body: JSON.stringify(values)
      // });
      toast({
        title: 'Colaborator invited.',
        description: `An invitation has been sent to ${values.email}`
      })
      console.log(values)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error inviting colaborator.',
        description:
          'There was a problem with your request, please try again later.'
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Invite your employees / colleagues</FormLabel>
              <FormControl>
                <Input placeholder='john.doe@hackin2.com' {...field} />
              </FormControl>
              <FormDescription>
                Enter the email of the user you want to invite to this program.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Invite collaborator</Button>
      </form>
    </Form>
  )
}
