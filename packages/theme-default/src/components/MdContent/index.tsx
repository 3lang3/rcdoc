import React from 'react';
import clsx from 'clsx';
import MdPreviewer from '../MdPreviewer';
import MdApi from '../MdApi';
import useActiveSidebarLinks from '../Slugs/useActiveSidebarLinks';
import MarkdownPageContext from '../../context';
import './index.less';
import { Flex, Icons, MdocSiteContext } from '@rcdoc/theme';
import Slugs from '../Slugs';

const previewer = (props) => <MdPreviewer defaultShowSource {...props} />;
const api = (props) => <MdApi {...props} />;

const MdContentComponent = ({ children, updatedTime, filePath, frontmatter = {} }) => {
  const { config, locale } = React.useContext(MdocSiteContext);
  const isCN = !locale || /^zh|cn$/i.test(locale.current[0]);

  const { url: repoUrl, branch, platform, package: packagePath } = config.repository;
  const { fluid, meta = true, style, blank, className } = frontmatter as any;

  const repoPlatform =
    { github: 'GitHub', gitlab: 'GitLab' }[
      (repoUrl || '').match(/(github|gitlab)/)?.[1] || 'nothing'
    ] || platform;

  // Reset scrollbar position
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Current page slugs action
  useActiveSidebarLinks();

  // File updatetime
  const updatedTimeStr = React.useMemo(() => {
    if (!updatedTime) return false;
    const updatedTimeIns = new Date(+updatedTime);
    return `${updatedTimeIns.toLocaleDateString([], {
      hour12: false,
    })} ${updatedTimeIns.toLocaleTimeString([], { hour12: false })}`;
  }, [updatedTime]);

  const showBottomMeta = !blank && meta && (!!updatedTimeStr || repoPlatform);

  return (
    <Flex align="flex-start">
      <section
        style={style}
        className={clsx('doc-md-content', className, {
          'doc-md-content--fluid': fluid,
          'doc-md-content--blank': blank,
        })}
      >
        {children({ previewer, api })}
        {showBottomMeta && (
          <Flex align="center" justify="space-between" className="doc-md-content__meta">
            {repoPlatform && (
              <a
                href={`${repoUrl}/edit/${branch}${packagePath ? `/${packagePath}` : ''}${filePath}`}
              >
                <Icons.GitHubIcon /> {isCN ? `在 ${repoPlatform} 上编辑此页` : `Edit this page`}
              </a>
            )}
            {!!updatedTimeStr && (
              <span>
                {isCN ? '最后更新时间：' : 'Last update: '} {updatedTimeStr}
              </span>
            )}
          </Flex>
        )}
      </section>
      {config?.site?.slug === 'content' && <Slugs />}
    </Flex>
  );
};

export default (props) => {
  const { dispatch } = React.useContext(MarkdownPageContext);
  React.useEffect(() => {
    // Sync markdown data to context value
    dispatch(props);
  }, []);
  return <MdContentComponent {...props} />;
};
