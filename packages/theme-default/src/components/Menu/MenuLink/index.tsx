import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import './index.less';
import Slugs from '../../Slugs';

const MenuLink = (props) => {
  const { item, active, renderMenuSlug } = props;

  const itemName = useMemo(() => {
    const name = (item.title || item.name).split(' ');
    return `${name[0]} <span>${name.slice(1).join(' ')}</span>`;
  }, [item.name, item.title]);

  return (
    <>
      {item.path ? (
        <>
          {item.group?.title ? <div className="doc-menu__title">{item.group.title}</div> : null}
          <Link
            className={clsx('doc-menulink')}
            to={item.langPath}
            dangerouslySetInnerHTML={{ __html: itemName }}
          />
          {renderMenuSlug && active && (
            <div className="doc-menulink--slug">
              <Slugs />
            </div>
          )}
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
