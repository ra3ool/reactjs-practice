import { CustomInput } from '@/components';
import { useState } from 'react';

export default function InputView() {
  const [value, setValue] = useState('');
  return (
    <>
      <div className="mb-12">
        <h1 className="mb-2">Custom Input Component with floatingLabel</h1>
        <CustomInput
          label="Username"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter username"
          inputStyle="floatingLabel"
        />
        {value}
      </div>
      <div className="mb-12">
        <h1 className="mb-2">Custom Input Component with border style</h1>
        <CustomInput
          label="Username"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter username"
          inputStyle="border"
        />
        {value}
      </div>
      <div className="mb-12">
        <h1 className="mb-2">Custom Input Component with underline style</h1>
        <CustomInput
          label="Username"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter username"
          inputStyle="underline"
        />
        {value}
      </div>
      <div className="mb-12">
        <h1 className="mb-2">Custom Input Component with no style</h1>
        <CustomInput
          label="Username"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter username"
          inputStyle="none"
        />
        {value}
      </div>
    </>
  );
}
