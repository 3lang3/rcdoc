import React, { useContext } from 'react';
import { MdocSiteContext, useApiData } from '@rcdoc/theme';

const LOCALE_TEXTS = {
  'zh-CN': {
    name: '属性名',
    description: '描述',
    type: '类型',
    default: '默认值',
    required: '(必选)',
  },
  'en-US': {
    name: 'Name',
    description: 'Description',
    type: 'Type',
    default: 'Default',
    required: '(required)',
  },
};

export default ({ definitions }) => {
  const { locale } = useContext(MdocSiteContext);
  const texts =
    !locale || /^zh|cn$/i.test(locale.current[0]) ? LOCALE_TEXTS['zh-CN'] : LOCALE_TEXTS['en-US'];

  const data = useApiData(definitions);

  return (
    <>
      {data && (
        <table style={{ marginTop: 24 }}>
          <thead>
            <tr>
              <th>{texts.name}</th>
              <th>{texts.description}</th>
              <th>{texts.type}</th>
              <th>{texts.default}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.identifier}>
                <td>{row.identifier}</td>
                <td>{row.description || '--'}</td>
                <td>
                  <code>{row.type}</code>
                </td>
                <td>
                  <code>{row.default || (row.required && texts.required) || '--'}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
