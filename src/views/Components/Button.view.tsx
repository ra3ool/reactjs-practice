import { CustomButton } from '@/components';

export default function ButtonView() {
  return (
    <>
      <div className="mb-12">
        <h3 className="mb-2 font-bold text-gray-900 dark:text-gray-100">
          Custom Button Component with variant primary
        </h3>
        <h3>variant primary</h3>
        <div className="flex gap-4 mb-8">
          <div className="flex flex-col">
            <label htmlFor="">size sm</label>
            <CustomButton variant="primary" size="sm">
              button
            </CustomButton>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">size md</label>
            <CustomButton variant="primary" size="md">
              button
            </CustomButton>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">size lg</label>
            <CustomButton variant="primary" size="lg">
              button
            </CustomButton>
          </div>
        </div>

        <h3>variant secondary</h3>
        <div className="flex gap-4 mb-8">
          <div className="flex flex-col">
            <label htmlFor="">size sm</label>
            <CustomButton variant="secondary" size="sm">
              button
            </CustomButton>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">size md</label>
            <CustomButton variant="secondary" size="md">
              button
            </CustomButton>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">size lg</label>
            <CustomButton variant="secondary" size="lg">
              button
            </CustomButton>
          </div>
        </div>

        <h3>variant outline</h3>
        <div className="flex gap-4 mb-8">
          <div className="flex flex-col">
            <label htmlFor="">size sm</label>
            <CustomButton variant="outline" size="sm">
              button
            </CustomButton>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">size md</label>
            <CustomButton variant="outline" size="md">
              button
            </CustomButton>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">size lg</label>
            <CustomButton variant="outline" size="lg">
              button
            </CustomButton>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <div className="flex flex-col">
            <label htmlFor="">loading</label>
            <CustomButton loading>button</CustomButton>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">disabled</label>
            <CustomButton disabled>button</CustomButton>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">prepend icon</label>
            <CustomButton prependIcon="chevron-right">button</CustomButton>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">append icon</label>
            <CustomButton appendIcon="chevron-right">button</CustomButton>
          </div>
        </div>
      </div>
    </>
  );
}
