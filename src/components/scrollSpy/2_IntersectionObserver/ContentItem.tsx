import { forwardRef, Ref } from 'react';

const ContentItem = forwardRef(
  (
    {
      id,
      index,
      title,
      description,
    }: {
      id: string;
      index: number;
      title: string;
      description: string;
    },
    ref: Ref<HTMLLIElement>,
  ) => {
    const lines = description.split('\r\n');
    const number = index + 1;

    return (
      <li id={id} data-index={index} ref={ref}>
        <h4>
          <strong>
            {number}. {title}
          </strong>
        </h4>
        <div>
          {lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </li>
    );
  },
);

export default ContentItem;
