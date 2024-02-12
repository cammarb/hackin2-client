import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';

export function SidebarItems({ items }) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-sm">
      {items.map((item, index) =>
        !item.disabled && item.href ? (
          <NavLink
            key={index}
            to={item.href}
            // className={cn(
            //   'flex w-full items-center rounded-md p-2 hover:underline',
            //   {
            //     'bg-muted': is === item.href
            //   }
            // )}
            target={item.external ? '_blank' : ''}
            rel={item.external ? 'noreferrer' : ''}
          >
            {item.logo}
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

export default function Sidebar({ items }) {
  return items.length ? (
    <div className="w-full bg-red">
      <SidebarItems items={items} />
    </div>
  ) : null;
}
