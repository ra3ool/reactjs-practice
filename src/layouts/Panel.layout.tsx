import { Outlet } from 'react-router';
import { Breadcrumb, LayoutContent } from '@/components';
import { Header } from '@/components';

export default function ComponentsLayout() {
  return (
    <LayoutContent headerComponent={<Header title="panel header" />}>
      <div className="grow-1 px-1">
        <Breadcrumb />
        <Outlet />
      </div>
    </LayoutContent>
  );
}
