import React from 'react';
import TestRenderer from 'react-test-renderer';
import Foo from '.';

it('<Foo />', () => {
  const baseRenderer = TestRenderer.create(<Foo title="render Foo with rcdoc" />);
  const testInstance = baseRenderer.root;

  const tree = baseRenderer.toJSON();
  expect(tree).toMatchSnapshot();
});
