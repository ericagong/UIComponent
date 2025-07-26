import { useRef, useState, useEffect, RefObject } from 'react';

type MaybeArray<T> = T | T[];

const useHover = (
  targetRefs: MaybeArray<RefObject<HTMLElement>>,
  delay = 100,
) => {
  const [isHovered, setIsHovered] = useState(false);
  const isHovering = useRef(false);
  const timeoutId = useRef<number>();

  useEffect(() => {
    const refs = Array.isArray(targetRefs) ? targetRefs : [targetRefs];

    const handleMouseEnter = () => {
      isHovering.current = true;
      clearTimeout(timeoutId.current);
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
      timeoutId.current = window.setTimeout(() => {
        if (!isHovering.current) setIsHovered(false);
      }, delay);
    };

    refs.forEach((ref) => {
      const $target = ref.current;
      if (!$target) return;
      $target.addEventListener('mouseenter', handleMouseEnter);
      $target.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      refs.forEach((ref) => {
        const $target = ref.current;
        if (!$target) return;
        $target.removeEventListener('mouseenter', handleMouseEnter);
        $target.removeEventListener('mouseleave', handleMouseLeave);
      });
      clearTimeout(timeoutId.current);
    };
  }, [targetRefs, delay]);

  return isHovered;
};

export default useHover;
