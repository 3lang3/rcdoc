/* eslint-disable no-nested-ternary */
import React from 'react';
import { MdocSiteContext, Icons } from '@mdoc/theme';
import clsx from 'clsx';
import Logo from '../Logo';
import SearchInput from '../SearchInput';
import Navbar from './Navbar';
import VersionToggle from './VersionToggle';
import LocaleSwitch from './LocaleSwitch';

import './index.less';

const Header = React.memo(
  () => {
    const { navs, versions, locale, config } =
      React.useContext(MdocSiteContext);
    return (
      <div className="vant-doc-header">
        <div className="doc-row">
          <div className="doc-row--left">
            <Logo config={config} versions={versions} />
            {Array.isArray(navs) && navs.length && <Navbar navs={navs} />}
          </div>
          <div className="vant-doc-header__top">
            {config.searchConfig && (
              <SearchInput
                lang={locale.current[0]}
                searchConfig={config.searchConfig}
              />
            )}
            <ul className="vant-doc-header__top-nav">
              {config.links &&
                config.links.length &&
                config.links.map(item => {
                  const guessGithub =
                    item.title?.toLowerCase() === 'github' && !item.logo;
                  const hasImg = item.logo || guessGithub;
                  return (
                    <li
                      key={item.url}
                      className={clsx(
                        'vant-doc-header__top-nav-item',
                        'vant-doc-header__top-nav-item--link',
                        {
                          'vant-doc-header__top-nav-item--img': hasImg,
                        },
                      )}
                    >
                      <a
                        className="vant-doc-header__cube"
                        target="_blank"
                        href={item.url}
                        title={item.alt}
                        rel="noreferrer"
                      >
                        {hasImg ? (
                          guessGithub ? (
                            <Icons.GitHubIcon alt={item.alt} />
                          ) : (
                            <img src={item.logo} alt={item.alt} />
                          )
                        ) : (
                          <>
                            {item.title}
                            <Icons.HttpLinkIcon className="vant-doc-header__cube--httplink" />
                          </>
                        )}
                      </a>
                    </li>
                  );
                })}
              <LocaleSwitch />
            </ul>
            {!!versions.length && <VersionToggle versions={versions} />}
          </div>
        </div>
      </div>
    );
  },
  () => true,
);

export default Header;
