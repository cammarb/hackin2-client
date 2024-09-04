import { Sidebar } from '@/components/Sidebar'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Breadcrumbs from '@/components/Breadcrumb'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { Program } from '@/utils/types'

export const ProgramManagement = ({
  program,
  defaultLayout = [20, 80],
  defaultCollapsed
}: {
  program: Program
  defaultLayout: number[] | undefined
  defaultCollapsed: boolean
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)

  return (
    <ResizablePanelGroup
      direction='horizontal'
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes
        )}`
      }}
      className='h-full fixed mt-[-3rem]'
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={4}
        collapsible={true}
        minSize={15}
        maxSize={20}
        onCollapse={() => {
          setIsCollapsed(true)
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            true
          )}`
        }}
        onResize={() => {
          setIsCollapsed(false)
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            false
          )}`
        }}
        className={cn(
          isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out'
        )}
      >
        <Sidebar program={program} isCollapsed={isCollapsed} />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={defaultLayout[1]}>
        <ScrollArea className='h-[calc(100dvh-4rem)] px-10'>
          {/* <Breadcrumbs root='programs' /> */}
          <div className='pt-10'>
            <Outlet />
          </div>
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
