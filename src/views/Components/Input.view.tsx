import { CustomInput } from '@/components';
import { useState } from 'react';

export default function InputView() {
  const [value, setValue] = useState('');
  return (
    <>
      <div className="mb-12">
        <h3 className="mb-2 font-bold text-gray-900 dark:text-gray-100">
          Custom Input Component with floatingLabel
        </h3>
        <CustomInput
          label="Username"
          value={value}
          onChange={setValue}
          placeholder="Enter username"
          inputStyle="floatingLabel"
        />
        <span className="text-gray-900 dark:text-gray-100">{value}</span>
      </div>
      <div className="mb-12">
        <h3 className="mb-2 font-bold text-gray-900 dark:text-gray-100">
          Custom Input Component with border style
        </h3>
        <CustomInput
          label="Username"
          value={value}
          onChange={setValue}
          placeholder="Enter username"
          inputStyle="border"
        />
        <span className="text-gray-900 dark:text-gray-100">{value}</span>
      </div>
      <div className="mb-12">
        <h3 className="mb-2 font-bold text-gray-900 dark:text-gray-100">
          Custom Input Component with underline style
        </h3>
        <CustomInput
          label="Username"
          value={value}
          onChange={setValue}
          placeholder="Enter username"
          inputStyle="underline"
        />
        <span className="text-gray-900 dark:text-gray-100">{value}</span>
      </div>
    </>
  );
}
