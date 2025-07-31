import cx from '../cx';
import data from '../data';

const Dropdown = () => {
  return (
    <>
      <h3>#1. selectBox 태그 기반 드롭다운</h3>
      <select className={cx('selectbox')}>
        {data.map((item) => (
          <option key={item.id} value={item.content}>
            {item.content}
          </option>
        ))}
      </select>
    </>
  );
};

export default Dropdown;
