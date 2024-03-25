'use client';

import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  title: string;
  pentester: Array<string>;
  created_at: string;
  updated_at: string;
  activity: string;
  status: 'pending' | 'qa' | 'approved' | 'rejected';
  severity: 'low' | 'normal' | 'high' | 'exceptional';
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'pentester',
    header: 'Pentester'
  },
  {
    accessorKey: 'created_at',
    header: 'Created At'
  },
  {
    accessorKey: 'updated_at',
    header: 'Updated At'
  },
  {
    accessorKey: 'activity',
    header: 'Activity'
  },
  {
    accessorKey: 'status',
    header: 'Status'
  },
  {
    accessorKey: 'severity',
    header: 'Severity'
  }
];
