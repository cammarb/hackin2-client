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
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { selectCurrentUser } from '@/features/auth/authSlice'
import { useAddProgramMutation } from '@/features/program/programSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { z, type ZodType } from 'zod'

type ProgramData = {
  name: string
  description: string
  location: string
}

export default function AddProgram() {
  const user = useSelector(selectCurrentUser)
  const company = user?.company?.id
  const [addProgram] = useAddProgramMutation()

  const { toast } = useToast()
  const navigate = useNavigate()

  const schema: ZodType<ProgramData> = z.object({
    name: z.string().min(2).max(30),
    description: z.string().min(2).max(200),
    location: z.string().min(2).max(100)
  })

  const form = useForm<ProgramData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      location: ''
    }
  })

  const submitData = async (data: ProgramData) => {
    try {
      await addProgram({
        id: company,
        body: {
          name: data.name,
          description: data.description,
          location: data.location
        }
      }).unwrap()
      toast({
        title: 'Success!',
        description: `You've added program ${data.name}.`
      })
      navigate('/programs')
    } catch (error) {
      console.error('Error adding program:', error)
    }
  }

  return (
    <>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Add new Program</CardTitle>
            <CardDescription>
              Enter the details for the new Program to be created.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(submitData)}
                className='space-y-8'
              >
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Program Name' {...field} />
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
                        <Textarea
                          placeholder='Program description'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='location'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder='e.g Berlin' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit'>Create</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
