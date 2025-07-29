import { useEffect, useRef } from 'react';

const mutationObserverOptions: MutationObserverInit = {
  childList: true,
  subtree: false,
};

const ModalsRoot = () => {
  const modalsRootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let observer: MutationObserver;
    if (modalsRootRef.current) {
      observer = new MutationObserver(() => {
        const size = modalsRootRef.current?.childNodes.length || 0;
        const hasModals = size > 0;
        const toggleScroll = () =>
          document.body.classList.toggle('no-scroll', hasModals);
        toggleScroll();
      });
      observer.observe(modalsRootRef.current, mutationObserverOptions);
      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return <div ref={modalsRootRef} id='modals-root' />;
};

export default ModalsRoot;
