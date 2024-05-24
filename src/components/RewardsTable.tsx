import { ZodType, number, z } from 'zod';
import { Button } from './ui/button';
import { Card, CardContent, CardTitle, CardHeader } from './ui/card';
import {
  DialogHeader,
  DialogClose,
  DialogFooter,
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogTrigger
} from './ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form';
import { Input } from './ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from './ui/table';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddRewardsMutation, useGetProgramRewardsQuery } from '@/features/company/companySlice';
import { Mail } from 'lucide-react';
import { Program } from '@/interface/Program';

interface RewardsTableProps {
  program: Program;
}

type RewardsData = {
  severity: string;
  min: number;
  max: number;
  programId: string;
};

export const RewardsTable = ({ program }: RewardsTableProps) => {
  const { data: response,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetProgramRewardsQuery(program.id)
  console.log(response)
  const [addReward] = useAddRewardsMutation();

  const schema: ZodType<RewardsData> = z.object({
    severity: z.string(),
    min: z.number().min(50).max(10000),
    max: z.number().min(50).max(10000),
    programId: z.string()
  });

  const form = useForm<RewardsData>({
    resolver: zodResolver(schema),
    defaultValues: {
      severity: '',
      min: 50,
      max: 10000,
      programId: ''
    }
  });

  const submitData = async (data: RewardsData) => {
    try {
      const newReward = await addReward({
        id: 'test',
        severity: {
          severity: data.severity,
          min: data.min,
          max: data.max,
          programId: data.programId
        }
      }).unwrap();
      form.reset({});
      console.log('Reward added:', newReward);
    } catch (error) {
      console.error('Error adding program:', error);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Rewards</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add Rewards</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Reward</DialogTitle>
                <DialogDescription>
                  Specify the maximum and minimun reward depending on the
                  severity of the finding.
                </DialogDescription>
              </DialogHeader>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(submitData)}
                  className="space-y-8"
                >
                  <div className="grid gap-4 ">
                    <FormField
                      control={form.control}
                      name="severity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Severity</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g Critical" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="min"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Min</FormLabel>
                          <FormControl>
                            <Mail className="mr-2 h-4 w-4" />
                            <Input placeholder="50" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="max"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Max</FormLabel>
                          <FormControl>
                            <Mail className="mr-2 h-4 w-4" />
                            <Input placeholder="10000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit">Add</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Low</TableHead>
                <TableHead>Medium</TableHead>
                <TableHead>High</TableHead>
                <TableHead>Critical</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{ }</TableCell>
                <TableCell>{ }</TableCell>
                <TableCell>{ }</TableCell>
                <TableCell>{ }</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};
