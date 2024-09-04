import { cn } from '@/lib/utils'
import { NavLink } from 'react-router-dom'

export function Navbar({
  className,
  links
}: { className?: string; links: { title: string; url: string }[] }) {
  return (
    <nav className={cn('flex items-center gap-2', className)}>
      {links.map((item) => (
        <NavLink
          key={item.title}
          to={`/${item.url}`}
          className={({ isActive }) =>
            cn(
              'py-2 px-4 text-sm font-medium whitespace-nowrap transition-colors hover:bg-neutral-700 hover:bg-opacity-50 rounded-sm',
              {
                'bg-muted underline underline-offset-8 decoration-primary decoration-2':
                  isActive
              }
            )
          }
        >
          {item.title}
        </NavLink>
      ))}
    </nav>
  )
}
