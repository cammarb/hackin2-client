import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Program } from '@/utils/types';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Building, PlusSquare } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isCollapsed: boolean;
  setProgram: React.Dispatch<React.SetStateAction<Program | null>>;
  programs: Program[]
}

interface NavProps {
  isCollapsed: boolean;
  programs: Program[];
  setProgram: React.Dispatch<React.SetStateAction<Program | null>>;
}

export function Sidebar({ isCollapsed, setProgram, programs }: SidebarProps) {
  const button = {
    title: 'Add Program',
    icon: PlusSquare,
    href: 'new',
    variant: 'default'
  };

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 px-4 data-[collapsed=true]:py-2"
    >
      <Nav
        programs={programs}
        isCollapsed={isCollapsed}
        setProgram={setProgram}
      />
      <div className="grid gap-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {isCollapsed ? (
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <NavLink
                  to={button.href}
                  className={({ isActive }) =>
                    cn(
                      'flex w-full items-center gap-4 rounded-md p-3 border hover:underline',
                      {
                        'bg-muted': isActive
                      }
                    )
                  }
                >
                  <button.icon className="w-4 h-4" />
                  <span className="sr-only">{button.title}</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {button.title}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <NavLink
            to={button.href}
            className={({ isActive }) =>
              cn(
                'flex w-full items-center gap-4 rounded-md p-3 border hover:underline',
                {
                  'bg-muted': isActive
                }
              )
            }
          >
            <button.icon className="w-4 h-4 mr-2" />
            {button.title}
          </NavLink>
        )}
      </div>
    </div>
  );
}

function Nav({ programs, isCollapsed, setProgram }: NavProps) {
  return (
    <nav className="grid gap-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
      {programs.map((program) =>
        isCollapsed ? (
          <TooltipProvider key={program.id}>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <NavLink
                  to={program.id}
                  className={({ isActive }) =>
                    cn(
                      'flex w-full items-center gap-4 rounded-md p-3 border hover:underline',
                      {
                        'bg-muted': isActive
                      }
                    )
                  }
                  onClick={() => setProgram(program)}
                >
                  <Building className="w-4 h-4" />
                  <span className="sr-only">{program.name}</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {program.name}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <NavLink
            key={program.id}
            to={program.id}
            className={({ isActive }) =>
              cn(
                'flex w-full items-center gap-4 rounded-md p-3 border hover:underline',
                {
                  'bg-muted': isActive
                }
              )
            }
            onClick={() => setProgram(program)}
          >
            <Building className="w-4 h-4 mr-2" />
            {program.name}
          </NavLink>
        )
      )}
    </nav>
  );
}
