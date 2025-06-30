import { SidebarProps } from '@/types';
import { NavLink } from 'react-router';
import { ExpanisonPanel } from '.';

export default function Sidebar({ title, items, className }: SidebarProps) {
  return (
    <aside
      className={`h-full w-full bg-neutral-200 dark:bg-neutral-800 text-gray-900 dark:text-gray-100 flex flex-col gap-6 select-none overflow-auto ${className}`}
    >
      {title && (
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 px-4">
          {title}
        </h2>
      )}
      <nav className="flex flex-col gap-2">
        {items.map((item) => {
          if (item.path) {
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `p-3 rounded-xl hover:bg-neutral-300 dark:hover:bg-neutral-700 ${
                    isActive ? 'bg-neutral-300 dark:bg-neutral-700' : ''
                  }`
                }
              >
                {item.title}
              </NavLink>
            );
          } else if (item.group) {
            return (
              <ExpanisonPanel key={item.title} title={item.title}>
                <Sidebar items={item.group} />
              </ExpanisonPanel>
            );
          } else if (item.component) {
            return (
              <div
                className="flex justify-between align-middle p-3 rounded-xl text-gray-900 dark:text-gray-100"
                key={item.title}
              >
                <span>{item.title}</span>
                {item.component}
              </div>
            );
          }
        })}
      </nav>
    </aside>
  );
}
