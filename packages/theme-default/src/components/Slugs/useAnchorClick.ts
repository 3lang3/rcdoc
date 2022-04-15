import React from 'react';

export default function useAnchorClick() {
  React.useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.target instanceof HTMLAnchorElement &&
        event.target.classList.contains('doc-md--slug')
      ) {
        const hash = event.target.hash;
        if (hash) {
          const anchor = document.querySelector<HTMLAnchorElement>(decodeURIComponent(hash));
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
