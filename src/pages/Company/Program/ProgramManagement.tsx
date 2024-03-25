import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import React from 'react';
import { Program } from '@/interface/Program';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable';
import { cn } from '@/lib/utils';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { useGetCompanyProgramsQuery } from '@/features/company/companySlice';

export default function ProgramManagement() {
  const user = useSelector(selectCurrentUser);
  const { data, isLoading, isSuccess, isError, error } =
    useGetCompanyProgramsQuery(user);
  let content;

  const [currentProgram, setCurrentProgram] = React.useState<Program | null>(
    null
  );
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
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
            onCollapse={() => {
              setIsCollapsed(true);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`;
            }}
            onExpand={() => {
              setIsCollapsed(false);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`;
            }}
            className={cn(
              isCollapsed &&
                'min-w-[50px] transition-all duration-300 ease-in-out'
            )}
          >
            <Sidebar
              programs={data.programs}
              setProgram={setCurrentProgram}
              isCollapsed={isCollapsed}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            {currentProgram ? <Outlet context={currentProgram} /> : <Outlet />}
          </ResizablePanel>
        </ResizablePanelGroup>
      </>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return (
    <>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
        }}
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel
          defaultSize={20}
          collapsedSize={4}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(!isCollapsed); 
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(isCollapsed)}`;
          }}
          className={cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')}
        >
          {content}
        </ResizablePanel>
        <Outlet />
      </ResizablePanelGroup>
    </>
  );
}