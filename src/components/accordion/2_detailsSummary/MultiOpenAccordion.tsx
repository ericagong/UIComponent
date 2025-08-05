import { useEffect, useRef } from 'react';

import cx from '../cx';
import data from '../data';

const AccordionItem = ({
  title,
  content,
  isOpen,
}: {
  title: string;
  content: string;
  isOpen: boolean;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const $contentEl = contentRef.current;

    if (!$contentEl) return;

    const handleOpen = () => isOpen;
    $contentEl.addEventListener('beforematch', handleOpen);

    return () => {
      $contentEl.removeEventListener('beforematch', handleOpen);
    };
  });

  return (
    <details open={isOpen}>
      <summary>{title}</summary>
      <div className={cx('panel')}>{content}</div>
    </details>
  );
};

const Accordion = () => {
  return (
    <>
      <h3>#2-1. 다중 열림 정책 아코디언 (details + summary 기반 구현)</h3>
      <ul className={cx('container')}>
        {data.map((d, index) => (
          <AccordionItem
            key={index}
            title={d.title}
            content={d.content}
            isOpen={index === 0} // default: 첫 번째 항목만 열림
          />
        ))}
      </ul>
    </>
  );
};

export default Accordion;
