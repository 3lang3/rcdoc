import React from 'react';
import { MdocSiteContext } from '@mdoc/theme';
import { Link } from 'react-router-dom';

export default () => {
  const { locale } = React.useContext(MdocSiteContext);
  return (
    <li className="vant-doc-header__top-nav-item">
      <Link className="vant-doc-header__cube" to={locale.switchLink}>
        {locale.switchLabel}
      </Link>
    </li>
  );
};
