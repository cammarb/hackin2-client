import { BountiesTable } from '@/components/BountiesTable';
import {
  useGetProgramBountiesQuery,
  useGetProgramQuery,
  useUpdateProgramMutation
} from '@/features/company/companySlice';
import { Program as ProgramType } from '@/interface/Program';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useOutletContext } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ZodType, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RewardsTable } from '@/components/RewardsTable';
import { ProgramData } from '@/pages/Company/Program/Program';
import { useEffect } from 'react';

const schema: ZodType<ProgramData> = z.object({
  id: z.string(),
  name: z.string().min(2).max(30),
  description: z.string().min(2).max(200),
  location: z.string().min(2).max(100),
  programStatus: z.string()
});

export const ProgramForm = ({ program }: { program: ProgramData }) => {

  const [updateProgram] = useUpdateProgramMutation();

  const form = useForm<ProgramData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: program.name,
      description: program.description,
      location: program.location,
      programStatus: program.programStatus
    }
  });

  const formReset = () => {
    form.reset({
      name: program.name,
      description: program.description,
      location: program.location,
      programStatus: program.programStatus
    });
  }

  useEffect(() => {
    formReset()
  }, [program, form]);

  const submitData = async (data: ProgramData) => {
    try {
      const updatedProgram = await updateProgram({
        id: program.id,
        program: {
          name: data.name,
          description: data.description,
          location: data.location,
          programStatus: data.programStatus
        }
      }).unwrap();
      console.log('Program updated');
    } catch (error) {
      console.error('Error updating program:', error);
    }
  };

  return (
    <>
      <div className="m-10">
        <header className="py-10 flex flex-row items-center justify-between">
          <h1 className="text-4xl font-medium">{program.name}</h1>
          <div className="flex gap-4">
            <Button variant="destructive">Delete</Button>
          </div>
        </header>
        <Tabs defaultValue="details">
          <TabsList className="">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="user-management">User Management</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="my-10">
            <div className="my-5 grid grid-cols-3 gap-5">
              <Card className="col-span-2">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(submitData)}>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Program overview</CardTitle>
                      <Button type="submit" >Save</Button>
                    </CardHeader>
                    <CardContent className=" grid gap-4">
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
                              <Textarea
                                placeholder="Program description"
                                {...field}
                              />
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
                      <FormField
                        control={form.control}
                        name="programStatus"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                              <Select>
                                <SelectTrigger
                                  id="status"
                                  aria-label="Select status"
                                >
                                  <SelectValue
                                    placeholder={program.programStatus.toLowerCase()}
                                    {...field}
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="DRAFT">Draft</SelectItem>
                                  <SelectItem value="ACTIVE">
                                    Active
                                  </SelectItem>
                                  <SelectItem value="PAUSED">
                                    Paused
                                  </SelectItem>
                                  <SelectItem value="COMPLETE">
                                    Complete
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </form>
                </Form>
              </Card>
              <RewardsTable programId={program.id} />
              <BountiesTable programId={program.id} />
            </div>
          </TabsContent>
          <TabsContent value="submissions" className="my-10">
            Submissions
          </TabsContent>
          <TabsContent value="user-management" className="my-10">
            User Management
          </TabsContent>
        </Tabs>
      </div >
    </>
  );
}
