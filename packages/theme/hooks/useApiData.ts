import React from 'react';
import context from '../context';

/**
 * get API data
 * @param identifier      component name
 * @param locale          current locale
 */
function getApiData(
  definitions: Record<string, string>[],
  locale: string,
) {
  return definitions.map(props => {
    const result = { description: props.description };
    Object.keys(props).forEach(prop => {
      // discard useless locale property
      if (prop.startsWith('description.')) {
        const [, propLocale] = prop.match(/^description\.(.*)$/);
        if (propLocale && propLocale === locale) {
          result.description = props[prop]
        }
      } else {
        // copy original property
        result[prop] = props[prop]
      }
    });

    return result;
  });
}

/**
 * use api data by identifier
 * @note  identifier is component name or component path
 */
export default (definitions: Record<string, string>[]) => {
  const {
    locale,
  } = React.useContext(context);
  const ref = React.useRef(false)
  const [data, setData] = React.useState(() => !locale ? definitions : getApiData(definitions, locale.current[0]));

  React.useEffect(() => {
    if (!ref.current) return
    setData(!locale ? definitions : getApiData(definitions, locale.current[0]));
  }, [locale]);

  React.useEffect(() => {
    if (!ref.current) ref.current = true
  }, [])

  return data;
};
