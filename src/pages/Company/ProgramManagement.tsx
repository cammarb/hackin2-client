import { Outlet, useLoaderData } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import React from 'react';
import { Program } from '@/loaders/programsLoader';
import { ProgramManagementDetails } from '@/components/ProgramManagementDetails';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable';
import { cn } from '@/lib/utils';

export default function ProgramManagement() {
  const programs = useLoaderData() as Program[];
  const [currentProgram, setCurrentProgram] = React.useState<Program | null>(
    null
  );
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel
          defaultSize={20}
          collapsedSize={4}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={(collapsed) => {
            setIsCollapsed(collapsed);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              collapsed
            )}`;
          }}
          className={cn(
            isCollapsed &&
              'min-w-[50px] transition-all duration-300 ease-in-out'
          )}
        >
          <Sidebar
            links={programs}
            setProgram={setCurrentProgram}
            isCollapsed={isCollapsed}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          {currentProgram ? (
            <>
              <Outlet context={currentProgram} />
              <ProgramManagementDetails program={currentProgram} />
            </>
          ) : (
            <div>Click on a program</div>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
