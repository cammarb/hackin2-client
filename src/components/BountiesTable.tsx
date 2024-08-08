import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useGetProgramBountiesQuery } from '@/features/program/programSlice'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export function BountiesTable({ programId }: { programId: string }) {
  const {
    data: response,
    isLoading,
    isSuccess,
    isError
  } = useGetProgramBountiesQuery(programId)

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
            {bounties.map((bounty) => (
              <TableRow key={bounty.id}>
                <TableCell>{bounty.title}</TableCell>
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
        <Button asChild>
          <Link to={'/'}>Add Bounty</Link>
        </Button>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  )
}
