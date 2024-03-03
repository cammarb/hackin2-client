import { Bounty } from '@/loaders/bountiesLoader';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

export function BountiesTable({ bounties }: { bounties: Bounty[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Tier</TableHead>
          <TableHead>Low</TableHead>
          <TableHead>Medium</TableHead>
          <TableHead>High</TableHead>
          <TableHead>Critical</TableHead>
          <TableHead>Exceptional</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bounties.map((bounty) => (
          <TableRow key={bounty.tier}>
            <TableCell>{bounty.tier}</TableCell>
            <TableCell>{bounty.low}</TableCell>
            <TableCell>{bounty.medium}</TableCell>
            <TableCell>{bounty.high}</TableCell>
            <TableCell>{bounty.critical}</TableCell>
            <TableCell>{bounty.exceptional}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
