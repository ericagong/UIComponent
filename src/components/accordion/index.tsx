import HiddenAttributeAccordion from './1_hiddenAttribute'
import DetailSummaryAccordions from './2_detailsSummary'
import cx from './cx'

const Accordions = () => {
    return (
        <div className={cx('Accordions')}>
            <h2>아코디언</h2>
            <HiddenAttributeAccordion />
            <DetailSummaryAccordions />
        </div>
    )
}

export default Accordions
