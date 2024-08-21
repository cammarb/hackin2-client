import type React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import type { Program } from '@/utils/types'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { Building, PlusSquare } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'

interface SidebarProps {
  isCollapsed: boolean
  programs: Program[]
}

interface NavItemProps {
  isCollapsed: boolean
  navLink: string
  navName: string
  icon: React.JSX.Element
}

export function Sidebar({ isCollapsed, programs }: SidebarProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className='group flex flex-col gap-4 py-2 px-4 data-[collapsed=true]:py-2'
    >
      <nav className='grid gap-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
        {programs.map((program) => (
          <Fragment key={program.id}>
            <NavItem
              isCollapsed={isCollapsed}
              key={program.id}
              navLink={program.id}
              navName={program.name}
              icon={<Building className='w-4 h-4' />}
            />
          </Fragment>
        ))}
        <NavItem
          isCollapsed={isCollapsed}
          navLink='new'
          navName='New Program'
          icon={<PlusSquare className='w-4 h-4' />}
        />
      </nav>
    </div>
  )
}

function NavItem({ isCollapsed, navLink, navName, icon }: NavItemProps) {
  return isCollapsed ? (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <NavLink
            to={navLink}
            className={({ isActive }) =>
              cn(
                'flex w-full items-center gap-4 rounded-md p-3 border hover:underline',
                {
                  'bg-muted': isActive
                }
              )
            }
          >
            {icon}
            <span className='sr-only'>{navName}</span>
          </NavLink>
        </TooltipTrigger>
        <TooltipContent side='right' className='flex items-center gap-4'>
          {navName}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <NavLink
      to={navLink}
      className={({ isActive }) =>
        cn(
          'flex w-full items-center gap-4 rounded-md p-3 border hover:underline',
          {
            'bg-muted': isActive
          }
        )
      }
    >
      {icon}
      {navName}
    </NavLink>
  )
}
