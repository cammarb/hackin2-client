import { Sidebar } from '@/components/Sidebar'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'
import { selectCurrentCompany } from '@/features/auth/authSlice'
import { useGetCompanyProgramsQuery } from '@/features/program/programSlice'
import { cn } from '@/lib/utils'
import type { Program } from '@/utils/types'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Breadcrumbs from '@/components/Breadcrumb'

export default function ProgramManagement() {
  const company = useSelector(selectCurrentCompany)
  const {
    data: response,
    isLoading,
    isSuccess,
    isError
  } = useGetCompanyProgramsQuery(company)
  const [currentProgram, setCurrentProgram] = useState<Program | null>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)

  let content = <></>

  if (isLoading) content = <p>Loading</p>
  else if (isError) content = <p>Error</p>
  else if (isSuccess) {
    const programs = response.programs
    content = (
      <Sidebar
        setProgram={setCurrentProgram}
        programs={programs}
        isCollapsed={isCollapsed}
      />
    )
  }

  return (
    <ResizablePanelGroup
      direction='horizontal'
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes
        )}`
      }}
      className='h-full items-stretch'
    >
      <ResizablePanel
        defaultSize={20}
        collapsedSize={4}
        collapsible={true}
        minSize={15}
        maxSize={20}
        onCollapse={() => {
          setIsCollapsed(true)
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`
        }}
        onExpand={() => {
          setIsCollapsed(false)
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`
        }}
        className={cn(
          isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out'
        )}
      >
        {content}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <div className='mx-10 my-3'>
          <Breadcrumbs />
          <div className='pt-10'>
            <Outlet />
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
