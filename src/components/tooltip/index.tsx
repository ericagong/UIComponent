import cx from './cx';
import DetailsSummaryTooltips from './1_detailsSummary';
import ClickEventTooltips from './2_clickEventHandler';
import HoverEventTooltips from './3_hoverEventHandler';

const Tooltips = () => {
  return (
    <div className={cx('Tooltips')} style={{ marginBottom: 500 }}>
      <h2>툴팁</h2>
      <DetailsSummaryTooltips />
      <ClickEventTooltips />
      <HoverEventTooltips />
    </div>
  );
};

export default Tooltips;
