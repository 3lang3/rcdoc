import React from 'react';
import clsx from 'clsx';
import { MdocSiteContext } from '@mdoc/theme';

const VersionToggle = ({ versions }) => {
  const {
    packageVersion,
  } = React.useContext(MdocSiteContext);

  const versionRef = React.useRef(null);
  const [showVersionPop, setShowVersionPop] = React.useState(false);

  const checkHideVersionPop = (event) => {
    if (!versionRef.current.contains(event.target)) {
      setShowVersionPop(false);
    }
  };

  const toggleVersionPop = () => {
    // eslint-disable-next-line react/no-this-in-sfc
    const val = !showVersionPop;
    const action = val ? 'add' : 'remove';
    document.body[`${action}EventListener`]('click', checkHideVersionPop);
    setShowVersionPop(val);
  };

  const onSwitchVersion = (version) => {
    if (version.link) {
      window.location.href = version.link;
    }
  };

  return (
    <div ref={versionRef} style={{ marginLeft: 10 }} className="vant-doc-header__top-nav-item">
      <span
        className={clsx('vant-doc-header__cube vant-doc-header__version')}
        onClick={toggleVersionPop}
      >
        {packageVersion}
        <div name="vant-doc-dropdown">
          {showVersionPop && (
            <div className="vant-doc-header__version-pop">
              {versions.map((item) => (
                <div
                  key={item}
                  className="vant-doc-header__version-pop-item"
                  onClick={() => onSwitchVersion(item)}
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </span>
    </div>
  );
};

export default VersionToggle;
