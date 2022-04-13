import React from 'react';
import { MdocSiteContext, Dropdown } from '@rcdoc/theme';
import { NavbarLink } from '../Navbar';

export default () => {
  const { packageVersion, config } = React.useContext(MdocSiteContext);
  const overlay = React.useMemo(() => {
    if (!Array.isArray(config?.site?.versions)) return false;
    return config?.site?.versions.map((ver) => (
      <NavbarLink className="doc-navbar__sublink" key={ver.title} path={ver.path}>
        {ver.title}
      </NavbarLink>
    ));
  }, [config?.site?.versions]);
  if (!overlay || !config?.site?.versions) return null;
  return (
    <Dropdown overlay={overlay} className="doc-navbar__item doc-header-action__lang">
      v{packageVersion}
    </Dropdown>
  );
};
