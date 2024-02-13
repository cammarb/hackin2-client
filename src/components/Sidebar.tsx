import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { NavLink } from 'react-router-dom';

export function SidebarItems({ items, program, setProgram }) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-sm p-6">
      {items.map((item, index) =>
        !item.disabled && item.href ? (
          <NavLink
            key={index}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex w-full items-center justify-between rounded-md p-2 hover:underline',
                {
                  'bg-red-300': isActive === item.href
                }
              )
            }
            target={item.external ? '_blank' : ''}
            rel={item.external ? 'noreferrer' : ''}
            onClick={() => setProgram(item)}
          >
            <Avatar>
              <AvatarImage src={item.logo} className="max-w-9" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {item.title}
          </NavLink>
        ) : (
          <span className="flex w-full cursor-not-allowed items-center rounded-md p-2 opacity-60">
            {item.title}
          </span>
        )
      )}
    </div>
  ) : null;
}

export default function Sidebar({ items, program, setProgram }) {
  return items.length ? (
    <div className="max-w-screen-sm h-screen fixed border border-red-300">
      <SidebarItems items={items} setProgram={setProgram} program={program} />
    </div>
  ) : null;
}
