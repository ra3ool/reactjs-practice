import { CustomToggle } from '@/components';
import { useState } from 'react';

export default function ToggleView() {
  const [isActive, setIsActive] = useState(true);

  const toggleActivity = (newVal: boolean) => {
    setIsActive(newVal);
  };

  return (
    <>
      <div className="mb-12">
        <h3 className="mb-2 font-bold text-gray-900 dark:text-gray-100">
          first style of toggle component
        </h3>
        <CustomToggle isActive={isActive} toggle={toggleActivity} />
      </div>
      <div className="mb-12">
        <h3 className="mb-2 font-bold text-gray-900 dark:text-gray-100">
          second style of toggle component
        </h3>
        <CustomToggle
          isActive={isActive}
          toggle={toggleActivity}
          hasBiggerBubble
        />
      </div>
      <div className="mb-12">
        <h3 className="mb-2 font-bold text-gray-900 dark:text-gray-100">
          toggle with labels
        </h3>
        <CustomToggle
          isActive={isActive}
          toggle={toggleActivity}
          activeLabelText="yes"
          deActiveLabelText="no"
        />
        <br />
        <CustomToggle
          isActive={isActive}
          toggle={toggleActivity}
          hasBiggerBubble
          activeLabelText="enable"
        />
      </div>
    </>
  );
}
