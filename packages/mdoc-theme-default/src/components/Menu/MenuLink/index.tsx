import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import './index.less';

const MenuLink = props => {
  const { item } = props;
  const { pathname } = useLocation();

  const itemName = useMemo(() => {
    const name = (item.title || item.name).split(' ');
    return `${name[0]} <span>${name.slice(1).join(' ')}</span>`;
  }, [item.name, item.title]);

  const active = useMemo(() => {
    if (pathname === item.langPath) {
      return true;
    }
    return false;
  }, [pathname]);

  return (
    <>
      {item.path ? (
        <>
          {item.group?.title ? (
            <div className="doc-menu__title">{item.group.title}</div>
          ) : null}
          <Link
            className={clsx('doc-menulink', {
              'doc-menulink--active': active,
            })}
            to={item.langPath}
            dangerouslySetInnerHTML={{ __html: itemName }}
          />
        </>
      ) : item.link ? (
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <a href={item.link} dangerouslySetInnerHTML={{ __html: itemName }} />
      ) : (
        <a dangerouslySetInnerHTML={{ __html: itemName }} />
      )}
    </>
  );
};

export default MenuLink;
