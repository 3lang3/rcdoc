import React from 'react';
import { getRealyHash } from './useActiveSidebarLinks';

export default function useAnchorClick() {
  React.useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.target instanceof HTMLAnchorElement &&
        event.target.classList.contains('doc-md--slug')
      ) {
        event.preventDefault();
        const hash = event.target.hash;
        if (hash) {
          const anchor = document.querySelector<HTMLAnchorElement>(getRealyHash(hash));
          if (anchor) {
            scrollTop(anchor);
          }
        }
      }
    };

    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
    };
  }, []);

  return null;
}

export function scrollTop(target: HTMLElement) {
  window.scrollTo({ top: target.offsetTop - 20 });
}
