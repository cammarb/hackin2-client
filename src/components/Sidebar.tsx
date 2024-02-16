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
  links: Program[];
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
      {isCollapsed ? (
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <NavLink
                to={'#'}
                className={(buttonVariants({ variant: 'outline' }), b)}
              >
                <button.icon className="h-4 w-4" />
                <span className="sr-only">{button.title}</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
              {button.title}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <NavLink to={'#'} className={buttonVariants({ variant: 'outline' })}>
          <button.icon className="mr-2 h-4 w-4" />
          {button.title}
        </NavLink>
      )}
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
                  to={link.href}
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
                  <Building className="h-4 w-4" />
                  <span className="sr-only">{link.title}</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <NavLink
            key={index}
            to={link.href}
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
            <Building className="mr-2 h-4 w-4" />
            {link.title}
          </NavLink>
        )
      )}
    </nav>
  );
}
