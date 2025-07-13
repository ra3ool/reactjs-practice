import { ExpansionPanel } from '@/components';

export default function ExpansionPanelView() {
  return (
    <>
      <div className="mb-12">
        <h3 className="mb-2 font-bold text-gray-900 dark:text-gray-100">
          expansion panel
        </h3>
        <ExpansionPanel
          isExpanded={true}
          title="title"
          className="border border-gray-300 dark:border-gray-700"
          expandedHeaderClassName="border-gray-300 dark:border-gray-700 border-b-1"
        >
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat
            eveniet fuga assumenda aut hic porro voluptate odio voluptates.
            Nobis obcaecati ipsam dignissimos adipisci eos, quidem consequatur
            maxime inventore saepe officiis!
          </p>
        </ExpansionPanel>
      </div>
    </>
  );
}
