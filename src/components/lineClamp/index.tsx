import cx from './cx';
import CanvasLineClamp from './1_canvas';
import CloneLineClamp from './2_clone';

const LineClamps = () => (
  <div className={cx('LineClamps')}>
    <h2>여러줄 말줄임</h2>
    <CanvasLineClamp />
    <CloneLineClamp />
  </div>
);

export default LineClamps;
