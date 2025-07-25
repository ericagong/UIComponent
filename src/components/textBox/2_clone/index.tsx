import { useRef, useEffect } from 'react';
import cx from '../cx';
import { clamp } from '@/components/utils';

const MIN_LINES = 3;
const MAX_LINES = 15;

// TODO textbox, lineclamp 공통 사용 로직 hook으로 분리
const TextBox = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const cloneRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const elem = textareaRef.current;
    const cloneElem = cloneRef.current;

    const handleInput = () => {
      if (!elem || !cloneElem) return;

      const value = elem.value;
      cloneElem.value = value;

      const totalRows = Math.floor(
        cloneElem.scrollHeight / cloneElem.clientHeight,
      );
      const clampedRows = clamp(totalRows, MIN_LINES, MAX_LINES);

      elem.rows = clampedRows;
    };

    if (elem) elem.addEventListener('input', handleInput);

    return () => {
      if (elem) elem.removeEventListener('input', handleInput);
    };
  }, []);

  return (
    <>
      <h3>#2. Uncontrolled 텍스트박스(Clone Element 기반 줄 개수 계산)</h3>
      <div className={cx('container')}>
        <label htmlFor='dynamic-textarea' className={cx('screen-reader-only')}>
          텍스트 입력 필드 (최소 {MIN_LINES}줄, 최대 {MAX_LINES}줄)
        </label>
        <textarea
          className={cx('clone')}
          ref={cloneRef}
          rows={1}
          readOnly
          tabIndex={-1}
          aria-hidden='true'
        />
        <textarea
          id='dynamic-textarea'
          className={cx('textarea')}
          ref={textareaRef}
          rows={MIN_LINES}
          aria-describedby='input-hint'
          placeholder='텍스트를 입력해주세요.'
        />
        <p id='input-hint' className={cx('screen-reader-only')}>
          줄 수는 자동으로 조절됩니다. 최소 {MIN_LINES}줄, 최대 {MAX_LINES}
          줄까지 입력할 수 있습니다.
        </p>
      </div>
    </>
  );
};

export default TextBox;
