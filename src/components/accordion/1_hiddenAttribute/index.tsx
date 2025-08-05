import { useEffect, useRef, useState } from 'react';

import cx from '../cx';
import data from '../data';

/* 참고: https://hiddenest.dev/accessible-accordion */
const AccordionItem = ({
  id,
  title,
  content,
  current,
  toggle,
}: {
  id: string;
  title: string;
  content: string;
  current: boolean;
  toggle: () => void;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerID = `accordion-trigger-${id}`;
  const contentID = `accordion-content-${id}`;

  useEffect(() => {
    const $contentEl = contentRef.current;
    if (!$contentEl) return;

    if ($contentEl) {
      $contentEl.addEventListener('beforematch', toggle);
    }
    return () => {
      if ($contentEl) $contentEl.removeEventListener('beforematch', toggle);
    };
  }, [toggle]);

  return (
    <li className={cx('item', { current })} key={id}>
      <button
        className={cx('trigger')}
        key={triggerID}
        aria-controls={contentID}
        aria-expanded={current}
        onClick={toggle}
      >
        {title}
      </button>
      <div
        className={cx('content')}
        ref={contentRef}
        key={contentID}
        aria-labelledby={triggerID}
        aria-hidden={!current}
        // @ts-ignore
        HIDDEN={current ? undefined : 'until-found'}
      >
        {content}
      </div>
    </li>
  );
};

const Accordion = () => {
  const [currentId, setCurrentId] = useState<string | null>(data[0].id);
  const toggleItem = (id: string) => () => {
    setCurrentId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <h3>
        #1. 단일 열림 아코디언 (hidden = "until-found" 기반 ctrl + F UX 제공)
      </h3>
      <ul className={cx('container')}>
        {data.map((d) => (
          <AccordionItem
            key={d.id}
            current={currentId === d.id}
            toggle={toggleItem(d.id)}
            {...d}
          />
        ))}
      </ul>
    </>
  );
};

export default Accordion;
