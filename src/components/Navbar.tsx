import { cn } from '@/lib/utils'
import { NavLink } from 'react-router-dom'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'

export function Navbar({
  className,
  links
}: {
  className?: string
  links: {
    title: string
    url: string
    children?: { title: string; url: string }[]
  }[]
}) {
  return (
    <nav className={cn('flex items-center gap-2', className)}>
      <NavigationMenu>
        <NavigationMenuList>
          {links.map((item) => (
            <NavigationMenuItem key={item.title}>
              {item.children ? (
                <>
                  <NavLink
                    to={`/${item.url}`}
                    className={({ isActive }) =>
                      cn(
                        'py-2 text-sm font-medium whitespace-nowrap transition-colors hover:bg-muted rounded-sm',
                        {
                          'bg-muted': isActive
                        }
                      )
                    }
                  >
                    <NavigationMenuTrigger className='prose'>
                      {item.title}
                    </NavigationMenuTrigger>
                  </NavLink>
                  <NavigationMenuContent>
                    <div className='grid grid-flow-row w-[300px] gap-3 p-4'>
                      {item.children.map((child) => (
                        <NavLink
                          key={child.title}
                          to={`/${child.url}`}
                          className={
                            'py-2 px-4 text-sm font-medium whitespace-nowrap transition-colors hover:bg-muted rounded-sm'
                          }
                          end={true}
                        >
                          {child.title}
                        </NavLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </>
              ) : (
                <NavLink
                  to={`/${item.url}`}
                  className={({ isActive }) =>
                    cn(
                      'py-2 px-4 text-sm font-medium whitespace-nowrap transition-colors hover:bg-muted rounded-sm',
                      {
                        'bg-muted': isActive
                      }
                    )
                  }
                >
                  {item.title}
                </NavLink>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  )
}
