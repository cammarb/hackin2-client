import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  useGetProgramBountiesQuery,
  useUpdateProgramMutation
} from '@/features/company/companySlice';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

export function BountiesTable({ programId }: { programId: string }) {
  const {
    data: response,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetProgramBountiesQuery(programId);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    const bounties = response.bounties;
    if (bounties.length === 0) content = <p>No Bounties yet.</p>;
    else
      content = (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Title</TableHead>
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
      );
  }

  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Bounties</CardTitle>
        <Button asChild>
          <Link to={'/'}>Add Bounty</Link>
        </Button>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
}
