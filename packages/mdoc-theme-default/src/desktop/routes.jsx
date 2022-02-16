/* eslint-disable react/react-in-jsx-scope */
import { decamelize } from '../common';
import { getLang, setDefaultLang } from '../common/locales';
import MdPage from './components/MdPage';

export function getLangFromRoute(pathname, locales) {
  const currentLang = pathname.split('/')[1];
  const langs = locales.map(el => el[0]);

  if (langs.indexOf(currentLang) !== -1) {
    return currentLang;
  }
  return getLang();
}

function parseName(name) {
  if (name.indexOf('_') !== -1) {
    const pairs = name.split('_');
    const component = pairs.shift();

    return {
      component: `${decamelize(component)}`,
      lang: pairs.join('-'),
    };
  }
  return {
    component: `${decamelize(name)}`,
    lang: '',
  };
}

function initRoutes({ config, documents }) {
  const { locales } = config;
  const defaultLang = locales[0][0];

  setDefaultLang(defaultLang);

  const getRoutes = () => {
    const routes = [];
    const names = Object.keys(documents);

    function addHomeRoute(Home, lang) {
      routes.push({
        name: lang,
        exact: true,
        path: `/${lang || ''}`,
        component: Home,
        state: { lang },
      });
    }

    names.forEach(name => {
      const { component, lang } = parseName(name);
      const { MdContent, frontmatter = {}, slugs = [] } = documents[name];
      const isDefaultLang = lang === defaultLang;

      const PreviewerComp = props => (
        <MdPage {...props} frontmatter={frontmatter} slugs={slugs}>
          {({ previewer }) => <MdContent previewer={previewer} />}
        </MdPage>
      );

      if (component === 'home') {
        addHomeRoute(p => <PreviewerComp {...p} />, lang);
      }
      
      routes.push({
        name: `${lang}/${component}`,
        path: isDefaultLang ? `/${component}` : `/${lang}/${component}`,
        component: p => <PreviewerComp {...p} />,
        state: {
          lang,
          name: component,
        },
      });
    });

    locales.forEach(locale => {
      routes.push({
        path: '*',
        redirect: () => (defaultLang === locale[0] ? '/' : `/${locale[0]}`),
        state: {
          lang: locale[0],
        },
      });
    });

    return routes;
  };

  return getRoutes();
}

export default initRoutes;
