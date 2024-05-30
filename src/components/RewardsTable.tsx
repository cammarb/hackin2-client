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
import {
  useAddRewardsMutation,
  useGetProgramRewardsQuery
} from '@/features/company/companySlice';
import { Mail } from 'lucide-react';
import { Program } from '@/interface/Program';
import { Badge } from './ui/badge';

interface RewardsTableProps {
  program: Program;
}

type RewardsData = {
  id: string;
  severity: string;
  min: number;
  max: number;
  programId: string;
};

export const RewardsTable = ({ program }: RewardsTableProps) => {
  const {
    data: response,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetProgramRewardsQuery(program.id);
  let rewards
  let content

  const [addReward] = useAddRewardsMutation();


  if (isLoading) {
    content = <>
      Loading...
    </>
  }
  else if (isSuccess) {
    const rewards = response.severityRewards;
    const schema = z.object({
      severity: z.string(),
      min: z.coerce.number().min(50).max(10000),
      max: z.coerce.number().min(50).max(10000),
      programId: z.string()
    });

    const submitData = async (data: RewardsData) => {
      try {
        const newReward = await addReward({
          id: program.id,
          reward: {
            min: data.min,
            max: data.max,
            programId: data.programId
          }
        }).unwrap();
        form.reset({});
        console.log('Reward updated.');
      } catch (error) {
        console.error('Error adding program:', error);
      }
    };

    content = (
      <TableBody>
        {rewards.map((reward: RewardsData) => {
          const form = useForm({
            resolver: zodResolver(schema),
            defaultValues: {
              severity: reward.severity,
              min: reward.min,
              max: reward.max,
              programId: reward.programId,
            }
          });

          return (
            <TableRow key={reward.id}>
              <TableCell>
                <Badge>{reward.severity}</Badge>
              </TableCell>
              <TableCell>{reward.min}</TableCell>
              <TableCell>{reward.max}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Edit</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit Reward</DialogTitle>
                      <DialogDescription>
                        Specify the maximum and minimum reward depending on the severity of the finding.
                      </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(submitData)} className="space-y-8">
                        <div className="grid gap-4 ">
                          <Badge>{reward.severity}</Badge>
                          <FormField
                            control={form.control}
                            name="min"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Min</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="e.g 50" {...field} />
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
                                  <Input type="number" placeholder="e.g 10000" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button type="submit">Save</Button>
                        </div>
                      </form>
                    </Form>
                    <DialogFooter>
                      <DialogClose asChild></DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    );
  } else if (isError) {
    content = <TableBody>There was an error.</TableBody>;
  } else {
    content = <TableBody>No rewards yet.</TableBody>;
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Rewards</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Severity</TableHead>
                <TableHead>Min</TableHead>
                <TableHead>Max</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            {content}
          </Table>
        </CardContent>
      </Card>
    </>
  );
};
