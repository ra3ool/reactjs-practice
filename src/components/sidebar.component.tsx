import { SidebarProps } from '@/types';
import { NavLink } from 'react-router';

export default function Sidebar({ config }: { config: SidebarProps }) {
  const { title, items } = config;

  return (
    <aside className="h-full w-56 bg-gray-900 text-white flex flex-col gap-6 py-6 px-2 shrink-0 select-none rounded-3xl overflow-auto">
      {title && (
        <h2 className="text-xl font-bold text-blue-400 px-4">{title}</h2>
      )}
      <nav className="flex flex-col gap-2">
        {items.map((item) => {
          if (item.path) {
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `hover:text-blue-300 transition-colors py-1 px-4 rounded-xl ${
                    isActive && 'bg-gray-700'
                  }`
                }
              >
                {item.title}
              </NavLink>
            );
          } else if (item.component) {
            return (
              <div
                className="flex justify-between align-middle py-1 px-4 rounded-xl"
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
