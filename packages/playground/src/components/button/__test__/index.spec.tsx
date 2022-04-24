import React from 'react';
import TestRenderer from 'react-test-renderer';
import Button from '..';

it('base render correctly', () => {
  const baseRenderer = TestRenderer.create(<Button>base button</Button>);
  const testInstance = baseRenderer.root;

  const tree = baseRenderer.toJSON();
  expect(tree).toMatchSnapshot();

  expect(testInstance.findByProps({ className: 'rv-button__text' }).children).toEqual([
    'base button',
  ]);
});
