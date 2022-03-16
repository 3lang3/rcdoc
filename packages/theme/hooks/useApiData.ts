import React from 'react';
import context from '../context';

/**
 * get API data
 * @param identifier      component name
 * @param locale          current locale
 * @param isDefaultLocale default locale flag
 */
function getApiData(
  definitions: Record<string, string>[],
  locale: string,
  isDefaultLocale: boolean,
) {
  return definitions.map(props => {
    // copy original data
    const result = Object.assign({}, props);
    Object.keys(props).forEach(prop => {
      // discard useless locale property
      if (/^description(\.|$)/.test(prop)) {
        const [, propLocale] = prop.match(/^description\.?(.*)$/);

        if ((propLocale && propLocale !== locale) || (!propLocale && !isDefaultLocale)) {
          delete result[prop];
        } else {
          result.description = result[prop]
        }

        if (!result.description) result.description = props['description']
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
    config: { locales },
  } = React.useContext(context);
  const ref = React.useRef(false)
  const isDefaultLocale = !locales.length || locales[0][0] === locale.current[0];
  const [data, setData] = React.useState(() => getApiData(definitions, locale.current[0], isDefaultLocale));

  React.useEffect(() => {
    if (!ref.current) return
    setData(getApiData(definitions, locale.current[0], isDefaultLocale));
  }, [locale, isDefaultLocale]);

  React.useEffect(() => {
    if (!ref.current) ref.current = true
  }, [])

  return data;
};
