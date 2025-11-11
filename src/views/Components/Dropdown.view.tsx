import { CustomDropdown, DropdownItem } from '@/components';

export default function DropdownView() {
  return (
    <div>
      <CustomDropdown
        triggerText={
          <span className="px-4 py-2 bg-blue-500 text-white rounded">Menu</span>
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
  );
}
