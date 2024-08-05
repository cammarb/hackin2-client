import {
  useGetSeverityRewardsQuery,
  useUpdateSeverityRewardMutation
} from '@/features/severityReward/severityRewardSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { MoreHorizontal } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from './ui/dropdown-menu'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form'
import { Input } from './ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from './ui/table'

type RewardsData = {
  id: string
  severity: string
  min: number
  max: number
  programId: string
}

const rewardSchema = z.object({
  severity: z.string(),
  min: z.coerce.number().min(50).max(10000),
  max: z.coerce.number().min(50).max(10000),
  programId: z.string()
})

const getBadgeVariant = (severity: string): string | any => {
  switch (severity) {
    case 'LOW':
      return 'low'
    case 'MEDIUM':
      return 'medium'
    case 'HIGH':
      return 'high'
    case 'CRITICAL':
      return 'critical'
    default:
      return 'default'
  }
}

const RewardRow = ({ reward }: { reward: RewardsData }) => {
  const [updateReward] = useUpdateSeverityRewardMutation()

  const form = useForm({
    resolver: zodResolver(rewardSchema),
    defaultValues: {
      id: reward.id,
      severity: reward.severity,
      min: reward.min,
      max: reward.max,
      programId: reward.programId
    }
  })

  const submitData = async (data: RewardsData) => {
    try {
      await updateReward({
        id: reward.id,
        body: {
          min: data.min,
          max: data.max
        }
      }).unwrap()
      form.reset({})
    } catch (error) {
      console.error('Error updating program:', error)
    }
  }

  return (
    <TableRow key={reward.id}>
      <TableCell>
        <Badge variant={getBadgeVariant(reward.severity)}>
          {reward.severity}
        </Badge>
      </TableCell>
      <TableCell>{reward.min}</TableCell>
      <TableCell>{reward.max}</TableCell>
      <TableCell>
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup='true' size='icon' variant='ghost'>
                <MoreHorizontal className='h-4 w-4' />
                <span className='sr-only'>Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DialogTrigger asChild>
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className='sm:max-w-[425px]'>
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
                className='space-y-8'
              >
                <div className='grid gap-4 '>
                  <Badge>{reward.severity}</Badge>
                  <FormField
                    control={form.control}
                    name='min'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Min</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='e.g 50'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='max'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='e.g 10000'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogClose asChild>
                    <Button type='submit'>Save</Button>
                  </DialogClose>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  )
}

export const RewardsTable = ({ programId }: { programId: string }) => {
  const {
    data: response,
    isLoading,
    isSuccess,
    isError
  } = useGetSeverityRewardsQuery({ key: 'program', value: programId })

  let content

  if (isLoading) {
    content = <>Loading...</>
  } else if (isSuccess) {
    const rewards = response.severityRewards

    content = (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Severity</TableHead>
            <TableHead>Min</TableHead>
            <TableHead>Max</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rewards.map((reward: RewardsData) => (
            <RewardRow reward={reward} key={reward.id} />
          ))}
        </TableBody>
      </Table>
    )
  } else if (isError) {
    content = <div>There was an error. </div>
  } else {
    content = <div>No rewards yet. </div>
  }

  return (
    <>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle>Rewards</CardTitle>
        </CardHeader>
        <CardContent>{content}</CardContent>
      </Card>
    </>
  )
}
