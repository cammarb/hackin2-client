import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Building, PlusSquare } from 'lucide-react';
import { Program } from '@/loaders/programsLoader';
import { buttonVariants } from './ui/button';
import { TooltipProvider } from '@radix-ui/react-tooltip';

interface SidebarProps {
  isCollapsed: boolean;
  links: unknown;
  setProgram: React.Dispatch<React.SetStateAction<Program | null>>;
}

interface NavProps {
  isCollapsed: boolean;
  links: Program[];
  setProgram: React.Dispatch<React.SetStateAction<Program | null>>;
}

export function Sidebar({ links, isCollapsed, setProgram }: SidebarProps) {
  const button = {
    title: 'Add Program',
    icon: PlusSquare,
    href: '#',
    variant: 'default'
  };

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 px-4 data-[collapsed=true]:py-2"
    >
      <Nav links={links} isCollapsed={isCollapsed} setProgram={setProgram} />
      <div className="grid gap-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {isCollapsed ? (
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <NavLink
                  to={'#'}
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
            to={'#'}
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

function Nav({ links, isCollapsed, setProgram }: NavProps) {
  return (
    <nav className="grid gap-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
      {links.map((link, index) =>
        isCollapsed ? (
          <TooltipProvider>
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <NavLink
                  to={link.name}
                  className={({ isActive }) =>
                    cn(
                      'flex w-full items-center gap-4 rounded-md p-3 border hover:underline',
                      {
                        'bg-muted': isActive
                      }
                    )
                  }
                  onClick={() => setProgram(link)}
                >
                  <Building className="w-4 h-4" />
                  <span className="sr-only">{link.name}</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.name}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <NavLink
            key={index}
            to={link.name}
            className={({ isActive }) =>
              cn(
                'flex w-full items-center gap-4 rounded-md p-3 border hover:underline',
                {
                  'bg-muted': isActive
                }
              )
            }
            onClick={() => setProgram(link)}
          >
            <Building className="w-4 h-4 mr-2" />
            {link.name}
          </NavLink>
        )
      )}
    </nav>
  );
}
