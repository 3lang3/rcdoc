import React from 'react';
import { DocSearch } from '@docsearch/react';

import './index.less';
import '@docsearch/css';

type SearchInputProps = {
  apiKey: string;
  appId: string;
  indexName: string;
} & Record<string, unknown>;

const SearchInput: React.FC<SearchInputProps> = (props) => {
  return (
    <div className="doc-search">
      <DocSearch {...props} />
    </div>
  );
};

export default SearchInput;
