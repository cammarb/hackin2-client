import { z } from 'zod';
import { Button } from './ui/button';
import { Card, CardContent, CardTitle, CardHeader } from './ui/card';
import {
  DialogHeader,
  DialogClose,
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogTrigger
} from './ui/dialog';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent
} from './ui/dropdown-menu';
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
  useUpdateRewardMutation,
  useGetProgramRewardsQuery
} from '@/features/company/companySlice';
import { Badge } from './ui/badge';
import { MoreHorizontal } from 'lucide-react';


type RewardsData = {
  id: string;
  severity: string;
  min: number;
  max: number;
  programId: string;
};

const rewardSchema = z.object({
  severity: z.string(),
  min: z.coerce.number().min(50).max(10000),
  max: z.coerce.number().min(50).max(10000),
  programId: z.string()
});

const getBadgeVariant = (severity: string): string | any => {
  switch (severity) {
    case 'LOW':
      return 'low';
    case 'MEDIUM':
      return 'medium';
    case 'HIGH':
      return 'high';
    case 'CRITICAL':
      return 'critical';
    default:
      return 'default';
  }
};

const RewardRow = ({ reward }: { reward: RewardsData }) => {
  const [updateReward] = useUpdateRewardMutation();

  const form = useForm({
    resolver: zodResolver(rewardSchema),
    defaultValues: {
      id: reward.id,
      severity: reward.severity,
      min: reward.min,
      max: reward.max,
      programId: reward.programId
    }
  });

  const submitData = async (data: RewardsData) => {
    try {
      const newReward = await updateReward({
        id: reward.id,
        body: {
          min: data.min,
          max: data.max
        }
      }).unwrap();
      form.reset({});
      console.log('Reward updated.');
    } catch (error) {
      console.error('Error updating program:', error);
    }
  };

  return (
    <TableRow key={reward.id}>
      <TableCell>
        <Badge variant={getBadgeVariant(reward.severity)}>{reward.severity}</Badge>
      </TableCell>
      <TableCell>{reward.min}</TableCell>
      <TableCell>{reward.max}</TableCell>
      <TableCell>
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DialogTrigger asChild>
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Reward</DialogTitle>
              <DialogDescription>
                Specify the maximum and minimum reward depending on the severity
                of the finding.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(submitData)}
                className="space-y-8"
              >
                <div className="grid gap-4 ">
                  <Badge>{reward.severity}</Badge>
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

                  <DialogClose asChild>
                    <Button type="submit">Save</Button>
                  </DialogClose>
                </div>
              </form>
            </Form>

          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};

export const RewardsTable = ({ programId }: { programId: string }) => {
  const {
    data: response,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetProgramRewardsQuery(programId);

  let content;

  if (isLoading) {
    content = <>Loading...</>;
  } else if (isSuccess) {
    const rewards = response.severityRewards;

    content = (
      <TableBody>
        {rewards.map((reward: RewardsData) => (
          <RewardRow reward={reward} key={reward.id} />
        ))}
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
