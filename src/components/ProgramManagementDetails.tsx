import { useLoaderData } from 'react-router-dom';
import React from 'react';
import { Bounty } from '@/loaders/bountiesLoader';
import { columns } from './ProgramManagementColumns';
import { ProgramManagementTable } from './ProgramManagementTable';
import { programLoader } from '@/loaders/programLoader';

export function ProgramManagementDetails() {
  const bounties = useLoaderData() as Bounty[];
  return (
    <>
      <h1>Program Management Details</h1>
      <BountiesTable bounties={bounties} />
      <div className="container mx-auto py-10">
        <ProgramManagementTable columns={columns} data={programLoader} />
      </div>
    </>
  );
}
