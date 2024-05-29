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

  if (isSuccess) {
    rewards = response.severityRewards;
    content = <>
      <TableBody>
        {rewards.map((reward) => (
          <TableRow key={reward.id}>
            <TableCell>
              <Badge>{reward.severity}</Badge>
            </TableCell>
            <TableCell>{reward.min}</TableCell>
            <TableCell>{reward.max}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  }
  else {
    content = <TableBody>No rewards yet.</TableBody>

  }
  const [addReward] = useAddRewardsMutation();

  const schema: ZodType<RewardsData> = z.object({
    severity: z.string(),
    min: z.coerce.number().min(50).max(10000),
    max: z.coerce.number().min(50).max(10000),
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
        id: program.id,
        reward: {
          severity: data.severity.toUpperCase(),
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
                            <Input
                              type="number"
                              placeholder="e.g 50"
                              {...field}
                            />
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
                            <Input
                              type="number"
                              placeholder="e.g 10000"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit">Add</Button>
                  </div>
                </form>
              </Form>
              <DialogFooter>
                <DialogClose asChild></DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Severity</TableHead>
                <TableHead>Min</TableHead>
                <TableHead>Max</TableHead>
              </TableRow>
            </TableHeader>
            {content}
          </Table>
        </CardContent>
      </Card>
    </>
  );
};
