import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Slugs from '../../Slugs';
import './index.less';

const MenuLink = (props) => {
  const { item, active, renderMenuSlug } = props;

  const itemName = useMemo(() => item.title || item.name, [item.name, item.title]);

  return (
    <>
      {item.path ? (
        <>
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
