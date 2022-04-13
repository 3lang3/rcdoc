import React from 'react';
import clsx from 'clsx';
import { MdocSiteContext, Icons, Dropdown } from '@rcdoc/theme';
import { Link } from 'react-router-dom';

export default () => {
  const { locale, config } = React.useContext(MdocSiteContext);
  const overlay = React.useMemo(() => {
    if (!Array.isArray(config.locales)) return false;
    if (!locale) return null;
    return config.locales.map((lang) => {
      const active = locale.current[0] === lang[0];
      if (active)
        return (
          <div key={lang[1]} className={clsx('doc-navbar__sublink', 'doc-navbar__sublink--active')}>
            {lang[1]}
          </div>
        );
      return (
        <Link className="doc-navbar__sublink" key={lang[0]} to={locale.switchLink}>
          {lang[1]}
        </Link>
      );
    });
  }, [JSON.stringify(locale)]);
  if (!overlay || !locale) return null;
  return (
    <Dropdown arrow={false} overlay={overlay} className="doc-navbar__item doc-header-action__lang">
      <Icons.LanguageIcon fill="#323232" />
    </Dropdown>
  );
};
