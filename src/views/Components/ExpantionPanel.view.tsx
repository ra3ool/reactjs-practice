import { ExpanisonPanel } from '@/components';

export default function ExpantionPanel() {
  return (
    <>
      <div className="mb-12">
        <h3 className="mb-2 font-bold text-gray-900 dark:text-gray-100">
          first style of toggle component
        </h3>
        <ExpanisonPanel isExpanded={true}>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat
            eveniet fuga assumenda aut hic porro voluptate odio voluptates.
            Nobis obcaecati ipsam dignissimos adipisci eos, quidem consequatur
            maxime inventore saepe officiis!
          </p>
        </ExpanisonPanel>
      </div>
    </>
  );
}
