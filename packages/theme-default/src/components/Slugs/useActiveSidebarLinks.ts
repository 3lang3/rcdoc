import React from 'react';
import useAnchorClick, { scrollTop } from './useAnchorClick';

type UseActiveSidebarLinksProps = { history?: 'broswer' | 'hash' };

export default function useActiveSidebarLinks(props?: UseActiveSidebarLinksProps) {
  const { history: historyType = 'broswer' } = props || {};
  let rootActiveLink: HTMLAnchorElement | null = null;
  let activeLink: HTMLAnchorElement | null = null;

  useAnchorClick();

  const onScroll = throttleAndDebounce(setActiveLink, 300);

  function setActiveLink(): void {
    const sidebarLinks = getSidebarLinks();
    const anchors = getAnchors(sidebarLinks);

    for (let i = 0; i < anchors.length; i++) {
      const anchor = anchors[i];
      const nextAnchor = anchors[i + 1];

      const [isActive, hash] = isAnchorActive(i, anchor, nextAnchor);
      if (isActive) {
        if (historyType === 'broswer') {
          window.history.replaceState(null, document.title, hash ? `#${hash}` : ' ');
        }
        activateLink(hash);
        return;
      }
    }
  }

  function activateLink(hash: string | null): void {
    deactiveLink(activeLink);
    deactiveLink(rootActiveLink);

    activeLink = document.querySelector(`.doc-md--slugs a[href*="#${hash}"]`);

    if (!activeLink) {
      return;
    }

    activeLink.classList.add('active');

    // also add active class to parent h2 anchors
    const rootLi = activeLink.closest('.sidebar-links > ul > li');

    if (rootLi && rootLi !== activeLink.parentElement) {
      rootActiveLink = rootLi.querySelector('a');
      rootActiveLink && rootActiveLink.classList.add('active');
    } else {
      rootActiveLink = null;
    }
  }

  function deactiveLink(link: HTMLAnchorElement | null): void {
    link && link.classList.remove('active');
  }

  React.useEffect(() => {
    init();
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
}

function init(): void {
  if (!location.hash) return;
  try {
    const target = document.querySelector<HTMLAnchorElement>(getRealyHash(location.hash));
    if (target) {
      scrollTop(target);
    }
  } catch (error) {
    // console.log(error)
  }
}

function getSidebarLinks(): HTMLAnchorElement[] {
  return [].slice.call(document.querySelectorAll('.doc-md--slugs a.doc-md--slug'));
}

function getAnchors(sidebarLinks: HTMLAnchorElement[]): HTMLAnchorElement[] {
  return [].slice
    .call(document.querySelectorAll('.doc-md-content [data-anchor]'))
    .filter((anchor: HTMLAnchorElement) =>
      sidebarLinks.some((sidebarLink) => getRealyHash(sidebarLink.href) === `#${anchor.id}`),
    ) as HTMLAnchorElement[];
}

function getPageOffset(): number {
  return (document.querySelector('.doc-header') as HTMLElement).offsetHeight;
}

function getAnchorTop(anchor: HTMLAnchorElement): number {
  const pageOffset = getPageOffset();

  return anchor!.offsetTop - pageOffset - 15;
}

function isAnchorActive(
  index: number,
  anchor: HTMLAnchorElement,
  nextAnchor: HTMLAnchorElement,
): [boolean, string | null] {
  const scrollTop = window.scrollY;
  if (index === 0 && scrollTop === 0) {
    return [true, null];
  }

  if (scrollTop < getAnchorTop(anchor)) {
    return [false, null];
  }

  if (!nextAnchor || scrollTop < getAnchorTop(nextAnchor)) {
    return [true, decodeURIComponent(anchor.id)];
  }

  return [false, null];
}

function throttleAndDebounce(fn: () => void, delay: number): () => void {
  let timeout: number;
  let called = false;

  return () => {
    if (timeout) {
      clearTimeout(timeout);
    }

    if (!called) {
      fn();
      called = true;
      setTimeout(() => {
        called = false;
      }, delay);
    } else {
      timeout = setTimeout(fn, delay) as unknown as number;
    }
  };
}

export function getRealyHash(hash: string): string {
  const val = hash.split('#').pop();
  return decodeURIComponent(`#${val}`);
}
