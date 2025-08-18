import { SidebarProps } from '@/types';
import { NavLink } from 'react-router';
import { ExpansionPanel } from '.';

const DEFAULT_ITEM_CLASS = 'flex justify-between align-middle p-3 rounded-xl';

export default function Sidebar({
  title,
  items,
  className,
  itemClassName,
  activeItemClassName,
}: SidebarProps) {
  return (
    <aside
      className={`h-full w-full flex flex-col gap-6 select-none overflow-auto ${className}`}
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
                end
                className={({ isActive }) =>
                  `${DEFAULT_ITEM_CLASS} ${itemClassName} ${
                    isActive ? activeItemClassName : ''
                  }`
                }
              >
                {item.title}
              </NavLink>
            );
          } else if (item.group) {
            return (
              <ExpansionPanel key={item.title} title={item.title}>
                <Sidebar
                  items={item.group}
                  itemClassName={itemClassName}
                  activeItemClassName={activeItemClassName}
                />
              </ExpansionPanel>
            );
          } else if (item.component) {
            return (
              <div className={DEFAULT_ITEM_CLASS} key={item.title}>
                <span>{item.title}</span>
                {item.component}
              </div>
            );
          } else if (item.actions) {
            return (
              <div
                className={`${DEFAULT_ITEM_CLASS} ${item.className}`}
                key={item.title}
                {...item.actions}
              >
                <span>{item.title}</span>
              </div>
            );
          }
        })}
      </nav>
    </aside>
  );
}
