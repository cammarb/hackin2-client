import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { Program } from '@/interface/Program';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function ProgramManagement() {
  const [currentProgram, setCurrentProgram] = useState<Program | null>(
    null
  );
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes
        )}`;
      }}
      className="h-full items-stretch"
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
          setProgram={setCurrentProgram}
          isCollapsed={isCollapsed}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        {currentProgram ? <Outlet context={currentProgram} key={currentProgram.id} /> : <Outlet />}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
