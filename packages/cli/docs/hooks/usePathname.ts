import React from 'react';

const _windowHistoryWrap = function (type) {
  const orig = window.history[type];
  const e = new Event(type) as any;
  return function () {
    const rv = orig.apply(this, arguments);
    e.arguments = arguments;
    window.dispatchEvent(e);
    return rv;
  };
};

const PROXY_EVENTS = [
  { name: 'popstate', replace: false },
  { name: 'pushState', replace: true },
  { name: 'replaceState', replace: true },
];

type UsePathnameProps = {
  (props?: {
    /**
     * @default 'browser'
     */
    history?: 'hash' | 'browser';
  }): string;
};

const usePathname: UsePathnameProps = ({ history = 'browser' }) => {
  const [pathname, updatePn] = React.useState(() =>
    history === 'hash' ? window.location.hash.substring(1) : window.location.pathname,
  );
  React.useEffect(() => {
    const updatePnCallback = () => {
      const { pathname, hash } = window.location;
      updatePn(history === 'hash' ? hash.substring(1) : pathname);
    };
    // 监听url change
    PROXY_EVENTS.filter((el) => el.replace).forEach((event) => {
      window.history[event.name] = _windowHistoryWrap(event.name);
    });
    PROXY_EVENTS.forEach((event) => {
      window.addEventListener(event.name, updatePnCallback);
    });

    return () => {
      PROXY_EVENTS.forEach((event) => {
        window.removeEventListener(event.name, updatePnCallback);
      });
    };
  }, []);

  return pathname;
};

export default usePathname;
