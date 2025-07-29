import data from '../data';
import cx from '../cx';
import useSnackbar from './useSnackbar';

const SnackbarPanel = ({
  id,
  index,
  content,
}: {
  id: string;
  index: number;
  content: string;
}) => {
  return (
    <p key={id} className={cx('panel')}>
      #{index + 1}. {content}
    </p>
  );
};

const SnackbarTrigger = ({
  id,
  index,
  content,
}: {
  id: string;
  index: number;
  content: string;
}) => {
  const $snackbarPanel = (
    <SnackbarPanel id={id} index={index} content={content} />
  );

  const { $snackbarEl, openSnackbar } = useSnackbar($snackbarPanel);
  return (
    <span className={cx('trigger-container')}>
      <button className={cx('trigger')} id={id} onClick={openSnackbar}>
        #{index + 1}. 스낵바 띄우기
      </button>
      {$snackbarEl}
    </span>
  );
};

const Snackbars = () => {
  return (
    <>
      <h3>#2. createPortal 기반 스낵바</h3>
      {data.map((d, idx) => (
        <SnackbarTrigger key={d.id} index={idx} {...d} />
      ))}
      <div id='snackbars-root' className={cx('snackbars-root')} />
    </>
  );
};

export default Snackbars;
