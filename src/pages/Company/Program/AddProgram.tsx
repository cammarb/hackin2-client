import { z, ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddProgramMutation } from '@/features/company/companySlice';

type ProgramData = {
  name: string;
  description: string;
  location: string;
};

export default function AddProgram() {
  const [addProgram] = useAddProgramMutation();

  const schema: ZodType<ProgramData> = z.object({
    name: z.string().min(2).max(30),
    description: z.string().min(2).max(30),
    location: z.string().min(2).max(100)
  });

  const form = useForm<ProgramData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      location: ''
    }
  });

  const submitData = async (data: ProgramData) => {
    try {
      const addedProgram = await addProgram({
        name: data.name,
        description: data.description,
        location: data.location
      }).unwrap();

      console.log('Program added:', addedProgram);
    } catch (error) {
      console.error('Error adding program:', error);
    }
  };

  return (
    <>
      <div className="m-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitData)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Program Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Program description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g Berlin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  );
}