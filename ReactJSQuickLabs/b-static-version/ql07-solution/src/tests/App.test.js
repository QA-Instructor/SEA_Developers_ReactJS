import React from 'react';
import { create } from 'react-test-renderer';
import App from '../App';

jest.mock("../Components/Header", () => () => <header id="mockHeader">Mock Header</header>);
jest.mock("../Components/Footer", () => () => <footer id="mockFooter">Mock Footer</footer>);

describe(`App component renders correctly`, () => {
  let testRenderer;
  let testInstance;

  beforeEach(() => {
    testRenderer = create(<App />);
    testInstance = testRenderer.root;
  });

  afterEach(() => {
    testRenderer = null;
    testInstance = null;
  })

  it(`renders a Header component`, () => {
    expect(testInstance.findByProps({ id: 'mockHeader' })).toBeTruthy();
  });

  it(`renders a Footer component`, () => {
    expect(testInstance.findByProps({ id: 'mockFooter' })).toBeTruthy();
  });
});



