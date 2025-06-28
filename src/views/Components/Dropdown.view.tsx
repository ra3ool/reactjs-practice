import { CustomDropdown, DropdownItem } from '@/components';
//TODO develop this component later on
export default function Dropdown() {
  return (
    <>
      <div className="mb-12">
        <CustomDropdown
          trigger={
            <span className="px-4 py-2 bg-blue-500 text-white rounded">
              Menu
            </span>
          }
        >
          <DropdownItem onClick={() => console.log('Option 1 clicked')}>
            Option 1
          </DropdownItem>
          <DropdownItem onClick={() => console.log('Option 2 clicked')}>
            Option 2
          </DropdownItem>
          <DropdownItem className="text-red-500 hover:bg-red-50">
            Delete
          </DropdownItem>
        </CustomDropdown>
      </div>
    </>
  );
}
