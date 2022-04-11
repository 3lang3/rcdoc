import React from 'react';
import { DocSearch } from '@docsearch/react';

import './index.less';
import '@docsearch/css';

const SearchInput = (props) => {
  return (
    <div className="doc-search">
      <DocSearch {...props} />
    </div>
  );
};

export default SearchInput;
