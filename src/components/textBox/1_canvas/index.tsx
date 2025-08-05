import { SyntheticEvent, useState } from 'react';

import { calculateLines, clamp } from '@/components/utils';

import cx from '../cx';

const MIN_LINES = 3;
const MAX_LINES = 15;

const TextBox = () => {
  const [value, setValue] = useState('');
  const [rows, setRows] = useState(MIN_LINES);

  const handleChange = (e: SyntheticEvent) => {
    const $textareaEl = e.target as HTMLTextAreaElement;
    const value = $textareaEl.value;
    const totalRows = clamp(
      calculateLines($textareaEl, value),
      MIN_LINES,
      MAX_LINES,
    );
    setValue(value);
    setRows(totalRows);
  };

  return (
    <>
      <h3>#1. Controlled 텍스트박스(Canvas 기반 줄 개수 계산)</h3>
      <div className={cx('container')}>
        <label htmlFor='canvas-textarea' className={cx('screen-reader-only')}>
          텍스트 입력 필드 (최소 {MIN_LINES}줄, 최대 {MAX_LINES}줄)
        </label>

        <textarea
          id='canvas-textarea'
          className={cx('textarea')}
          onChange={handleChange}
          rows={rows}
          value={value}
          placeholder='텍스트를 입력해주세요.'
          aria-describedby='canvas-textarea-hint'
        />

        <p id='canvas-textarea-hint' className={cx('screen-reader-only')}>
          입력한 텍스트 길이에 따라 줄 수가 자동으로 조절됩니다. 최소{' '}
          {MIN_LINES}줄에서 최대 {MAX_LINES}줄까지 입력 가능합니다.
        </p>
      </div>
    </>
  );
};

export default TextBox;
