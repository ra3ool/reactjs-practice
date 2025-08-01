import { Outlet } from 'react-router';
import {
  Breadcrumb,
  CustomButton,
  CustomDropdown,
  DropdownItem,
  LayoutContent,
} from '@/components';
import { Header } from '@/components';

export default function ComponentsLayout() {
  return (
    <LayoutContent
      headerComponent={
        <Header
          title="panel header"
          action={
            <CustomDropdown
              align="right"
              trigger={<CustomButton variant="outline">options</CustomButton>}
            >
              <DropdownItem onClick={() => console.log('profile clicked')}>
                profile
              </DropdownItem>
              <DropdownItem onClick={() => console.log('invoices clicked')}>
                invoices
              </DropdownItem>
            </CustomDropdown>
          }
        />
      }
    >
      <div className="grow-1 px-1">
        <Breadcrumb />
        <Outlet />
      </div>
    </LayoutContent>
  );
}
