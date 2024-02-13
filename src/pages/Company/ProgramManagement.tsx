import { Outlet, useLoaderData } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import React from 'react';
import { Program } from '@/loaders/programsLoader';

export default function ProgramManagement() {
  const programs = useLoaderData() as Program[];
  const [currentProgram, setCurrentProgram] = React.useState<Program | null>(
    null
  );

  return (
    <>
      <Sidebar
        items={programs}
        program={currentProgram}
        setProgram={setCurrentProgram}
      />
      <Outlet context={currentProgram} />
    </>
  );
}
