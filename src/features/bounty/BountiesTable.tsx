import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  useGetBountiesQuery,
  useNewBountyMutation
} from '@/features/bounty/bountyApiSlice'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '../../components/ui/card'
import { capitalizeFirstLetter } from '@/utils/stringFormatter'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function BountiesTable({ programId }: { programId: string }) {
  const {
    data: response,
    isLoading,
    isSuccess,
    isError
  } = useGetBountiesQuery({ key: 'program', value: programId })
  const [addBounty] = useNewBountyMutation()

  // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
  let content
  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isError) {
    content = <p>Error</p>
  } else if (isSuccess) {
    if (!response.bounties) content = <p>No Bounties yet.</p>
    else {
      const bounties = response.bounties
      content = (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Title</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bounties.map((bounty: Bounty) => (
              <TableRow key={bounty.id}>
                <TableCell>{bounty.title}</TableCell>
                <TableCell>{capitalizeFirstLetter(bounty.status)}</TableCell>
                <TableCell>{bounty.description}</TableCell>
                {/* <TableCell>{bounty.requirements}</TableCell> */}
                {/* <TableCell>{bounty.rules}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )
    }
  }

  return (
    <Card className='col-span-3'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle>Bounties</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline'>Add Bounty</Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Create Bounty</DialogTitle>
              <DialogDescription>
                Create your bounty here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='name' className='text-right'>
                  Name
                </Label>
                <Input
                  id='name'
                  defaultValue='Pedro Duarte'
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='username' className='text-right'>
                  Description
                </Label>
                <Textarea
                  id='username'
                  defaultValue='@peduarte'
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='username' className='text-right'>
                  Severity
                </Label>
                <Textarea
                  id='username'
                  defaultValue='@peduarte'
                  className='col-span-3'
                />
              </div>
            </div>
            <DialogFooter>
              <Button type='submit'>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  )
}
