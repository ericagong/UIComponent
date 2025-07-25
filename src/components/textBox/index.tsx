import cx from './cx';
import CanvasTextBox from './1_canvas';
import CloneTextBox from './2_clone';

const TextBoxes = () => {
  return (
    <div className={cx('TextBoxes')}>
      <h2>반응형 텍스트박스</h2>
      <CanvasTextBox />
      <CloneTextBox />
    </div>
  );
};

export default TextBoxes;
