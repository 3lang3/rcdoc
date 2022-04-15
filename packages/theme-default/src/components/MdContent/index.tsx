import React from 'react';
import clsx from 'clsx';
import MdPreviewer from '../MdPreviewer';
import MdApi from '../MdApi';
import useActiveSidebarLinks from '../Slugs/useActiveSidebarLinks';
import MarkdownPageContext from '../../context';
import './index.less';

const previewer = (props) => <MdPreviewer defaultShowSource {...props} />;
const api = (props) => <MdApi {...props} />;

const MdContentComponent = ({ children, updatedTime, frontmatter = {} }) => {
  const { fluid, style, className } = frontmatter as any;

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

  return (
    <section
      style={style}
      className={clsx('doc-md-content', className, {
        'doc-md-content--fluid': fluid,
      })}
    >
      {children({ previewer, api })}
      {!!updatedTimeStr && <span style={{ display: 'none' }}>Last update: {updatedTimeStr}</span>}
    </section>
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
