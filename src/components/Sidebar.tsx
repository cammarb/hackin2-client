import type React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import type { Program } from '@/utils/types'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { Building, Crosshair, List, Send } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'

interface SidebarProps {
  isCollapsed: boolean
  program: Program
}

interface NavItemProps {
  isCollapsed: boolean
  navLink: string
  navName: string
  icon: React.JSX.Element
}

interface ProgramTitleItemProps {
  isCollapsed: boolean
  programTitle: string
  icon: React.JSX.Element
}

export function Sidebar({ isCollapsed, program }: SidebarProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className='group flex flex-col gap-4 py-2 px-4 data-[collapsed=true]:py-2'
    >
      <nav className='grid gap-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
        <ProgramTitleItem
          programTitle={program.name}
          isCollapsed={isCollapsed}
          icon={<Building className='w-4 h-4' />}
        />
        <Separator />
        <NavItem
          isCollapsed={isCollapsed}
          navLink={''}
          navName={'Details'}
          icon={<List className='w-4 h-4' />}
        />
        <NavItem
          isCollapsed={isCollapsed}
          navLink={'bounties'}
          navName={'Bounties'}
          icon={<Crosshair className='w-4 h-4' />}
        />
        <NavItem
          isCollapsed={isCollapsed}
          navLink={'applications'}
          navName={'Applications'}
          icon={<Send className='w-4 h-4' />}
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
          <span>
            <NavLink
              to={navLink}
              className={({ isActive }) =>
                cn(
                  'flex w-full items-center gap-4 rounded-md p-3 hover:bg-muted',
                  {
                    'bg-muted text-primary': isActive
                  }
                )
              }
            >
              {icon}
              <span className='sr-only'>{navName}</span>
            </NavLink>
          </span>
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
        cn('flex w-full items-center gap-4 rounded-md p-3 hover:bg-muted', {
          'bg-muted text-primary': isActive
        })
      }
      end={true}
    >
      {icon}
      {navName}
    </NavLink>
  )
}

function ProgramTitleItem({
  isCollapsed,
  programTitle,
  icon
}: ProgramTitleItemProps) {
  return isCollapsed ? (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <div
            className={
              'flex w-full items-center gap-4 rounded-md p-3 justify-center text-center text-2xl font-semibold'
            }
          >
            {icon}
            <span className='sr-only'>{programTitle}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent side='right' className='flex items-center gap-4'>
          {programTitle}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <div
      className={
        'flex w-full items-center gap-4 rounded-md p-3 justify-center text-center text-2xl font-semibold'
      }
    >
      {icon}
      {programTitle}
    </div>
  )
}
