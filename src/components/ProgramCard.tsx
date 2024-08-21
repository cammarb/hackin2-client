import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useUpdateProgramMutation } from '@/features/program/programSlice'
import type { EditableProgram, Program as ProgramData } from '@/utils/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { type ZodType, z } from 'zod'

export const ProgramCard = ({ program }: { program: ProgramData }) => {
  const [updateProgram] = useUpdateProgramMutation()

  const schema: ZodType<EditableProgram> = z.object({
    id: z.string(),
    name: z.string().min(2).max(30),
    description: z.string().min(2),
    location: z.string().min(2).max(100),
    programStatus: z.string()
  })

  const form = useForm<ProgramData>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: program.id,
      name: program.name,
      description: program.description,
      location: program.location,
      programStatus: program.programStatus
    }
  })

  const submitData = async (data: ProgramData) => {
    try {
      await updateProgram({
        id: program.id,
        program: {
          id: program.id,
          name: data.name,
          description: data.description,
          location: data.location,
          programStatus: data.programStatus
        }
      }).unwrap()
    } catch (error) {
      console.error('Error updating program:', error)
    }
  }

  return (
    <>
      <Card className='col-span-2'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitData)}>
            <CardHeader className='flex flex-row items-center justify-between'>
              <CardTitle>Program overview</CardTitle>
            </CardHeader>
            <CardContent className=' grid gap-4'>
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
                      <Textarea placeholder='Program description' {...field} />
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
              <FormField
                control={form.control}
                name='programStatus'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='status'>Status</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger id='status' aria-label='Select status'>
                          <SelectValue
                            placeholder={'Select a status'}
                            {...field}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='DRAFT'>Draft</SelectItem>
                          <SelectItem value='ACTIVE'>Active</SelectItem>
                          <SelectItem value='PAUSED'>Paused</SelectItem>
                          <SelectItem value='COMPLETE'>Complete</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit'>Save</Button>
            </CardContent>
          </form>
        </Form>
      </Card>
    </>
  )
}
