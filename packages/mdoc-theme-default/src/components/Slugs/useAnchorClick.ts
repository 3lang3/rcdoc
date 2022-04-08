import React from "react"

export default function useAnchorClick() {
  React.useEffect(() => {
    const anchors = document.querySelectorAll("a.doc-md--slug");
    const onClick = (e: MouseEvent) => {
      e.preventDefault();
      const target = e.target as HTMLAnchorElement;
      const hash = target.hash;
      if (hash) {
        const anchor = document.querySelector<HTMLAnchorElement>(decodeURIComponent(hash));
        if (anchor) {
          scrollTop(anchor)
        }
      }
    };
    anchors.forEach(anchor => {
      anchor.addEventListener("click", onClick);
    });
    return () => {
      anchors.forEach(anchor => {
        anchor.removeEventListener("click", onClick);
      });
    };
  }, [])

  return null
}

export function scrollTop(target: HTMLElement) {
  window.scrollTo({ top: target.offsetTop - 20, });
}