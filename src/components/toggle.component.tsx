import { useState } from 'react';

export default function Toggle({
  toggle,
  hasBiggerBubble = false,
}: {
  toggle: (arg0: boolean) => void;
  hasBiggerBubble?: boolean;
}) {
  const [isActive, setIsActive] = useState(true);
  const toggleActivity = () => {
    setIsActive(!isActive);
    toggle(!isActive);
  };

  return (
    <div
      className={`rounded-2xl bg-gray-500 w-12 flex items-center align-middle cursor-pointer ${
        hasBiggerBubble ? 'h-4' : 'h-6 p-1'
      }`}
      onClick={toggleActivity}
    >
      <span className={`duration-300 ${isActive ? 'grow-1' : ''}`}></span>
      <span
        className={`flex rounded-full aspect-square duration-300 ${
          isActive ? 'bg-blue-500' : 'bg-gray-300'
        } ${hasBiggerBubble ? 'h-6' : 'h-full'}`}
      ></span>
    </div>
  );
}
