import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

export function BountiesTable({ bounties }: { bounties: any }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Title</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bounties.map((bounty, index) => (
          <TableRow key={bounty.id}>
            <TableCell>{bounty.title}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
