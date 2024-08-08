import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog'
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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { z, type ZodType } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateSubmissionMutation } from './submissionSlice'
import { Button } from '@/components/ui/button'

const status = ['PENDING', 'REVIEWED', 'RESOLVED', 'REJECTED']

export const ProgramSubmissionUpdate = ({
  submissionStatus,
  submissionId
}: { submissionStatus: string; submissionId: string }) => {
  const [updateSubmission] = useUpdateSubmissionMutation()

  const schema: ZodType<{ status: string }> = z.object({
    status: z.string().min(2).max(30)
  })

  const form = useForm<{ status: string }>({
    resolver: zodResolver(schema),
    defaultValues: {
      status: submissionStatus
    }
  })

  const submitData = async (data: { status: string }) => {
    try {
      await updateSubmission({
        id: submissionId,
        body: {
          status: data.status
        }
      }).unwrap()
      form.reset({})
    } catch (error) {
      console.error('Error updating submission:', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitData)} className='space-y-8'>
        <DialogHeader>
          <DialogTitle>Update Submission</DialogTitle>
          <DialogDescription>Change the status below</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 '>
          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id='severity' aria-label='Select status'>
                      <SelectValue placeholder={'Select status'} {...field} />
                    </SelectTrigger>
                    <SelectContent>
                      {status.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type='submit'>Update</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  )
}
