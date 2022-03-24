import * as parser from 'react-docgen-typescript';
import type { StaticPropFilter, PropFilter } from 'react-docgen-typescript/lib/parser';
import { buildFilter as getBuiltinFilter } from 'react-docgen-typescript/lib/buildFilter.js';
import type {
  PropFilter as IPropFilter,
  PropItem as IPropItem,
} from 'react-docgen-typescript/lib/parser';


interface IStaticPropFilter extends StaticPropFilter {
  /**
   * skip props which parsed from node_modules
   */
  skipNodeModules?: boolean;
}

export type PropFilterType = IStaticPropFilter | PropFilter;

export type ApiParserProps = {
  propFilter?: PropFilterType;
};

// ref: https://github.com/styleguidist/react-docgen-typescript/blob/048980a/src/parser.ts#L1110
const DEFAULT_EXPORTS = [
  'default',
  '__function',
  'Stateless',
  'StyledComponentClass',
  'StyledComponent',
  'FunctionComponent',
  'StatelessComponent',
  'ForwardRefExoticComponent',
];

/**
 * implement skipNodeModules filter option
 * @param prop  api prop item, from parser
 * @param opts  filter options
 */
function extraFilter(prop: IPropItem, opts: IStaticPropFilter) {
  // check within node_modules
  if (opts.skipNodeModules && prop.declarations.find(d => d.fileName.includes('node_modules'))) {
    return false;
  }

  return true;
}

export default (
  filePath: string,
  { componentName, ...filterOpts }: IStaticPropFilter & { componentName?: string } = {},
  remarkOpts?: ApiParserProps
) => {
  let definitions;
  let localFilter: PropFilterType = filterOpts;
  const globalFilter = remarkOpts?.propFilter;
  const isDefaultRegExp = new RegExp(`^${componentName}$`, 'i');

  switch (typeof globalFilter) {
    // always use global filter if it is funuction
    case 'function':
      localFilter = globalFilter;
      break;

    // merge passed opts & global opts, and create custom filter
    default:
      localFilter = (
        (mergedOpts): IPropFilter =>
          (prop, component) => {
            const builtinFilter = getBuiltinFilter({ propFilter: mergedOpts });

            return builtinFilter(prop, component) && extraFilter(prop, mergedOpts);
          }
      )(Object.assign({}, globalFilter, localFilter));
  }

  // use cache first
  if (!definitions) {
    let defaultDefinition: any;

    definitions = {};
    parser
      .withCompilerOptions(
        { esModuleInterop: true, jsx: 'preserve' as any },
        {
          savePropValueAsString: true,
          shouldExtractLiteralValuesFromEnum: true,
          shouldRemoveUndefinedFromOptional: true,
          componentNameResolver: source => {
            // use parsed component name from remark pipeline as default export's displayName
            return DEFAULT_EXPORTS.includes(source.getName()) ? componentName : undefined;
          },
          propFilter: localFilter,
        },
      )
      .parse(filePath)
      .forEach(item => {
        // convert result to IApiDefinition
        const exportName = isDefaultRegExp.test(item.displayName) ? 'default' : item.displayName;
        const props = Object.entries(item.props).map(([identifier, prop]) => {
          const result = { identifier } as any;
          const fields = ['identifier', 'description', 'type', 'defaultValue', 'required'];
          const localeDescReg = /(?:^|\n+)@description\s+/;

          fields.forEach(field => {
            switch (field) {
              case 'type':
                result.type = prop.type.raw || prop.type.name;
                break;

              case 'description':
                // the workaround way for support locale description
                // detect locale description content, such as @description.zh-CN xxx
                if (localeDescReg.test(prop.description)) {
                  // split by @description symbol
                  const groups = prop.description.split(localeDescReg).filter(Boolean);

                  groups?.forEach(str => {
                    const [, locale, content] = str.match(/^(\.[\w-]+)?\s*([^]*)$/);

                    result[`description${locale || ''}`] = content;
                  });
                } else if (prop.description) {
                  result.description = prop.description;
                }
                break;

              case 'defaultValue':
                if (prop[field]) {
                  result.default = prop[field].value;
                }
                break;

              default:
                if (prop[field]) {
                  result[field] = prop[field];
                }
            }
          });

          return result;
        });

        if (exportName === 'default') {
          defaultDefinition = props;
        } else {
          definitions[exportName] = props;
        }
      });

    // to make sure default export always in the top
    if (defaultDefinition) {
      definitions = Object.assign({ default: defaultDefinition }, definitions);
    }
  }
  
  return definitions;
};
