import React from 'react';
import clsx from 'clsx';
import MdPreviewer from '../MdPreviewer';
import MdApi from '../MdApi';
import useActiveSidebarLinks from '../Slugs/useActiveSidebarLinks';
import MarkdownPageContext from '../../context';
import { Flex, Icons, MdocSiteContext } from '@rcdoc/theme';
import './index.less';

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

  // Current page slugs action
  useActiveSidebarLinks({ history: config.site.history });

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
    <section
      style={style}
      className={clsx('doc-md-content', className, {
        'doc-md-content--fluid': fluid,
        'doc-md-content--blank': blank,
      })}
    >
      <div className="doc-md-content__wrapper">{children({ previewer, api })}</div>
      {showBottomMeta && (
        <Flex align="center" justify="space-between" className="doc-md-content__meta">
          {repoPlatform && (
            <a href={`${repoUrl}/edit/${branch}${packagePath ? `/${packagePath}` : ''}${filePath}`}>
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
  );
};

export default ({ children, ...props }) => {
  const { dispatch } = React.useContext(MarkdownPageContext);
  React.useEffect(() => {
    // Sync markdown data to context value
    dispatch({ ...props, loading: false });
  }, []);
  return <MdContentComponent {...(props as any)}>{children}</MdContentComponent>;
};
