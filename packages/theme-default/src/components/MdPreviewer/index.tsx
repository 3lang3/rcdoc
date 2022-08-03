/* eslint-disable @typescript-eslint/no-use-before-define */
import Highlight, { defaultProps } from 'prism-react-renderer';
import type { Language } from 'prism-react-renderer';
import React from 'react';
import clsx from 'clsx';
import { useCodeSandbox, useStackBlitz, useCopy, Icons, MdocSiteContext } from '@rcdoc/theme';
import './index.less';

type DependenciesType = {
  type: string;
  value: string;
  css: boolean;
};

export type MDocPreviewerProps = {
  code: string;
  lang: string;
  key: string;
  dependencies: Record<string, DependenciesType>;
  meta: Record<string, any>;
  defaultShowSource?: boolean;
  children: React.ReactNode;
};

/**
 * get source code type for file
 * @param file    file path
 * @param source  file source object
 */
function getSourceType(file: string) {
  // use file extension as source type first
  const type = file.match(/\.(\w+)$/)?.[1];

  return type || 'jsx';
}

const FileTabs = ({
  files,
  current,
  setCurrent,
}: {
  files: [string, DependenciesType][];
  current: any;
  setCurrent: any;
}) => {
  const code = React.useMemo(() => current?.code, [current]);
  const lang = React.useMemo(() => current?.lang, [current]);

  return (
    <div className="default-previewer__tabs">
      {files.map(([filename, info]) => {
        return (
          <div
            key={filename}
            onClick={() => setCurrent({ code: info.value, lang: getSourceType(filename) })}
            className={clsx('default-previewer__tabs-plane', {
              'default-previewer__tabs-plane--active': info.value === code,
            })}
          >
            <Icons.FileIcon /> {filename}
          </div>
        );
      })}
      <DefaultRender code={code} lang={lang} />
    </div>
  );
};

const DefaultRender = ({
  code,
  lang,
  showCopy,
}: {
  code: string;
  lang: string;
  showCopy?: boolean;
}) => {
  const [copy, copyStatus] = useCopy();
  return (
    <Highlight {...defaultProps} code={code} language={lang as Language} theme={undefined}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className="default-pre">
          {showCopy && (
            <button
              type="button"
              title="复制"
              className="default-pre__btn"
              onClick={() => copy(code)}
            >
              {copyStatus === 'ready' ? (
                <Icons.CopyIcon />
              ) : (
                <Icons.DoneIcon className="default-pre__btn-svg--active" />
              )}
            </button>
          )}
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        </div>
      )}
    </Highlight>
  );
};

export default ({ children, defaultShowSource, ...props }: MDocPreviewerProps) => {
  const { config } = React.useContext(MdocSiteContext);

  const hasSimulator = !!config?.site?.themeConfig?.simulator;

  const dependenciesArr = React.useMemo(
    () => Object.entries(props.dependencies || []),
    [props.dependencies],
  );
  const files = React.useMemo(
    () => dependenciesArr.filter(([, el]) => el.type === 'FILE'),
    [dependenciesArr],
  );

  const hasDeps = Object.keys(props?.dependencies || []).length > 0;
  const openCsb = useCodeSandbox(
    { ...props, ...config.resolve?.codesandbox },
    { simulator: hasSimulator },
  );
  const openSlb = useStackBlitz({ ...props, ...config.resolve?.stackblitz });
  const [copy, copyStatus] = useCopy();

  const [showSource, setShowSource] = React.useState(() => {
    return defaultShowSource || hasSimulator || (hasDeps && !children);
  });

  const [current, setCurrent] = React.useState<{ code: string; lang: string }>({
    code: props.code,
    lang: props.lang,
  });

  return hasDeps ? (
    <div className="default-previewer">
      {!hasSimulator && children && <div className="default-previewer__demo">{children}</div>}
      <div className="default-previewer__actions">
        {Object.keys(props?.dependencies || []).length ? (
          <>
            <button
              type="button"
              title="在codesandbox上尝试"
              className="default-previewer__btn default-previewer__csb"
              onClick={openCsb}
            >
              <Icons.CsbIcon />
            </button>

            <button
              type="button"
              title="在Stackblitz上尝试"
              className="default-previewer__btn default-previewer__csb"
              onClick={openSlb}
            >
              <Icons.StackblitzIcon />
            </button>
          </>
        ) : null}
        <button
          type="button"
          title="复制"
          className="default-previewer__btn default-previewer__copy"
          onClick={() => copy(current.code)}
        >
          {copyStatus === 'ready' ? (
            <Icons.CopyIcon />
          ) : (
            <Icons.DoneIcon className="default-pre__btn-svg--active" />
          )}
        </button>
        {!hasSimulator && children && (
          <button
            type="button"
            className="default-previewer__btn"
            onClick={() => setShowSource((v) => !v)}
          >
            <Icons.CodeIcon />
          </button>
        )}
      </div>

      {showSource && (
        <div className="default-previewer__source">
          {files.length === 1 ? (
            <DefaultRender {...props} />
          ) : (
            <FileTabs files={files} current={current} setCurrent={setCurrent} />
          )}
        </div>
      )}
    </div>
  ) : (
    <DefaultRender {...props} showCopy />
  );
};
