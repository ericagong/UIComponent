import { useRef, useEffect, useState, SyntheticEvent } from 'react';
import cx from '../cx';
import data from '../data';

// 한계: ctrl+F 검색 시, 다중 열림 처리됨
const AccordionItem = ({
  title,
  content,
  isOpen,
  toggle,
}: {
  title: string;
  content: string;
  isOpen: boolean;
  toggle: () => void;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    toggle();
  };

  useEffect(() => {
    const $panelEl = contentRef.current;

    if (!$panelEl) return;
    $panelEl.addEventListener('beforematch', toggle);

    return () => {
      $panelEl.removeEventListener('beforematch', toggle);
    };
  });

  return (
    <details open={isOpen}>
      <summary onClick={handleClick}>{title}</summary>
      <div className={cx('panel')}>{content}</div>
    </details>
  );
};

const Accordion = () => {
  const [currentId, setCurrentId] = useState<string | null>(data[0].id);
  const toggleItem = (id: string) => () => {
    setCurrentId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <h3>#2-2. 단일 열림 정책 아코디언 (details + summary 기반 구현)</h3>
      <ul className={cx('container')}>
        {data.map((d, index) => (
          <AccordionItem
            key={index}
            title={d.title}
            content={d.content}
            isOpen={currentId === d.id}
            toggle={toggleItem(d.id)}
          />
        ))}
      </ul>
    </>
  );
};

export default Accordion;
