import React from 'react';

const _windowHistoryWrap = function (type) {
  const orig = history[type];
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

const usePathname = () => {
  const [pathname, updatePn] = React.useState(() => window.location.pathname);
  React.useEffect(() => {
    const updatePnCallback = () => {
      updatePn(window.location.pathname);
    };
    // 监听url change
    PROXY_EVENTS.filter((el) => el.replace).forEach((event) => {
      history[event.name] = _windowHistoryWrap(event.name);
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
