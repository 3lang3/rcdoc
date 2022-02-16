/* eslint-disable react/react-in-jsx-scope */
import { decamelize } from '../common';
import { getLang, setDefaultLang } from '../common/locales';
import MdPage from './components/MdPage';

export function getLangFromRoute(pathname, locales) {
  const lang = pathname.split('/')[1];
  const langs = Object.keys(locales);

  if (langs.indexOf(lang) !== -1) {
    return lang;
  }
  return getLang();
}

function initRoutes({ config, documents }) {
  const { locales, defaultLang } = config.site;
  setDefaultLang(defaultLang);

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

      const desktopFrontmatter = Object.keys(frontmatter).reduce((a, fk) => {
        if (!fk.startsWith('mobile-')) {
          a[fk] = frontmatter[fk];
        }
        return a;
      }, {});

      const PreviewerComp = props => (
        <MdPage {...props} frontmatter={desktopFrontmatter} slugs={slugs}>
          {({ previewer }) => <MdContent previewer={previewer} />}
        </MdPage>
      );

      if (component === 'home') {
        addHomeRoute(p => <PreviewerComp {...p} />, lang);
      }

      if (lang) {
        routes.push({
          name: `${lang}/${component}`,
          path: `/${lang}/${component}`,
          component: p => <PreviewerComp {...p} />,
          state: {
            lang,
            name: component,
          },
        });
      } else {
        routes.push({
          name: `${component}`,
          path: `/${component}`,
          component: p => <PreviewerComp {...p} />,
          meta: {
            name: component,
          },
        });
      }
    });

    if (locales) {
      routes.push({
        path: '*',
        redirect: pathname => `/${getLangFromRoute(pathname, locales)}/`,
      });
    } else {
      routes.push({
        path: '*',
        redirect: () => '/',
      });
    }
    return routes;
  };

  return getRoutes()
}

export default initRoutes;
