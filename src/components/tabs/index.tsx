import DisplayAttributeTabMenu from './1.displayAttribute'
import SelectiveRenderTabMenu from './2.selectiveRender'
import cx from './cx'

const TabMenus = () => {
    return (
        <div className={cx('TabMenus')}>
            <h2>탭메뉴</h2>
            <DisplayAttributeTabMenu />
            <SelectiveRenderTabMenu />
        </div>
    )
}

export default TabMenus
