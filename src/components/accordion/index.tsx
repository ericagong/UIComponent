import cx from './cx';
import HiddenAttributeAccordion from './1_hiddenAttribute';
import DetailSummaryAccordions from './2_detailsSummary';

const Accordions = () => {
  return (
    <div className={cx('Accordions')}>
      <h2>아코디언</h2>
      <HiddenAttributeAccordion />
      <DetailSummaryAccordions />
    </div>
  );
};

export default Accordions;
