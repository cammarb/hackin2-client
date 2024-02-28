// import { Outlet, useLoaderData } from 'react-router-dom';
// import { Sidebar } from '@/components/Sidebar';
// import React from 'react';
// import { Program } from '@/loaders/programsLoader';
// import ProgramManagementNav from '@/components/Company/ProgramManagementNav';

// import {
//   ResizableHandle,
//   ResizablePanel,
//   ResizablePanelGroup
// } from '@/components/ui/resizable';
// import { cn } from '@/lib/utils';

// export default function ProgramManagement() {
//   const programs = useLoaderData() as Program[];
//   const [currentProgram, setCurrentProgram] = React.useState<Program | null>(null);
//   const [isCollapsed, setIsCollapsed] = React.useState(false);

//   const combinedHeaderHeight = '90px';

//   return (
//     <>
//       <ProgramManagementNav />
//       <Outlet />
//       <div style={{ paddingTop: combinedHeaderHeight }}>
//         <ResizablePanelGroup
//           direction="horizontal"
//           onLayout={(sizes: number[]) => {
//             document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
//           }}
//           className="h-full max-h-[800px] items-stretch"
//         >
//           <ResizablePanel
//             defaultSize={20}
//             collapsedSize={4}
//             collapsible={true}
//             minSize={15}
//             maxSize={20}
//             onCollapse={(collapsed) => {
//               setIsCollapsed(collapsed);
//               document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(collapsed)}`;
//             }}
//             className={cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')}
//           >
//             <Sidebar
//               links={programs}
//               setProgram={setCurrentProgram}
//               isCollapsed={isCollapsed}
//             />
//           </ResizablePanel>
//           <ResizableHandle withHandle />
//           <ResizablePanel>
//             {currentProgram ? (
//               <Outlet context={currentProgram} />
//             ) : (
//               <div>Click on a program</div>
//             )}
//           </ResizablePanel>
//         </ResizablePanelGroup>
//       </div>
//     </>
//   );
// }



// import { Outlet, useLoaderData } from 'react-router-dom';
// import { Sidebar } from '@/components/Sidebar';
// import React from 'react';
// import { Program } from '@/loaders/programsLoader';
// import ProgramManagementNav from '@/components/Company/ProgramManagementNav';
// import {
//   ResizableHandle,
//   ResizablePanel,
//   ResizablePanelGroup
// } from '@/components/ui/resizable';
// import { cn } from '@/lib/utils';

// export default function ProgramManagement() {
//   const programs = useLoaderData() as Program[];
//   const [currentProgram, setCurrentProgram] = React.useState<Program | null>(null);
//   const [isCollapsed, setIsCollapsed] = React.useState(false);
//   // const location = useLocation();
// const isBaseRoute = location.pathname === '/program-management';

//   return (
//     <>
//       <ProgramManagementNav />
//       <Outlet />
//       {isBaseRoute ? (
//         <div style={{ paddingTop: '10px' }}>
//           <ResizablePanelGroup
//           >
//             <ResizablePanel
//             >
//               <Sidebar
//                 links={programs}
//                 setProgram={setCurrentProgram}
//                 isCollapsed={isCollapsed}
//               />
//             </ResizablePanel>
//             <ResizableHandle withHandle />
//             <ResizablePanel>
//               {currentProgram ? (
//                 <Outlet context={currentProgram} />
//               ) : (
//                 <div>Click on a program</div>
//               )}
//             </ResizablePanel>
//           </ResizablePanelGroup>
//         </div>
//       ) : (
//         <Outlet />
//       )}
//     </>
//   );
// }



//   const combinedHeaderHeight = '90px';

//   return (
//     <>
//       <ProgramManagementNav />
//       <Outlet />
//       <div style={{ paddingTop: combinedHeaderHeight }}>
//         <ResizablePanelGroup
//           direction="horizontal"
//           onLayout={(sizes: number[]) => {
//             document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
//           }}
//           className="h-full max-h-[800px] items-stretch"
//         >
//           <ResizablePanel
//             defaultSize={20}
//             collapsedSize={4}
//             collapsible={true}
//             minSize={15}
//             maxSize={20}
//             onCollapse={(collapsed) => {
//               setIsCollapsed(collapsed);
//               document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(collapsed)}`;
//             }}
//             className={cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')}
//           >
//             <Sidebar
//               links={programs}
//               setProgram={setCurrentProgram}
//               isCollapsed={isCollapsed}
//             />
//           </ResizablePanel>
//           <ResizableHandle withHandle />
//           <ResizablePanel>
//             {currentProgram ? (
//               <Outlet context={currentProgram} />
//             ) : (
//               <div>Click on a program</div>
//             )}
//           </ResizablePanel>
//         </ResizablePanelGroup>
//       </div>
//     </>
//   );
// }

import { Outlet, useLoaderData } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import React from 'react';
import { Program } from '@/loaders/programsLoader';
import ProgramManagementNav from '@/components/Company/ProgramManagementNav';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable';
import { cn } from '@/lib/utils';

export default function ProgramManagement() {
  const programs = useLoaderData() as Program[];
  const [currentProgram, setCurrentProgram] = React.useState<Program | null>(null);
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const combinedHeaderHeight = '90px';

  return (
    <>
      <ProgramManagementNav />
      <Outlet />
      <div style={{ paddingTop: combinedHeaderHeight }}>
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
            onCollapse={(collapsed) => {
              setIsCollapsed(collapsed);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(collapsed)}`;
            }}
            className={cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')}
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
              <Outlet context={currentProgram} />
            ) : (
              <div>Click on a program</div>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}
