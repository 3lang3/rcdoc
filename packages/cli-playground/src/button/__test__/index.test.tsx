import React from 'react';
import renderer from 'react-test-renderer';
import Button from '..';

it('Button default render', () => {
  const component = renderer.create(<Button>Facebook</Button>);
  let tree = component.toJSON() as any;
  expect(tree).toMatchSnapshot();
});
