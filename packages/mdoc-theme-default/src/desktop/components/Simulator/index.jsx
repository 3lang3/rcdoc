import React from 'react';

export default ({ src }) => {
  return (
    <div className="doc-simulator">
      <iframe className="doc-simulator__iframe" src={src}></iframe>
    </div>
  );
};
