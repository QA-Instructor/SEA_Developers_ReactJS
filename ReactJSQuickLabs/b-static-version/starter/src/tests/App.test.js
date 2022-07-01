import React from 'react';
import { create } from 'react-test-renderer';
import App from '../App';

jest.mock("../Components/Header", () => () => <header id="mockHeader">Mock Header</header>);
jest.mock("../Components/Footer", () => () => <footer id="mockFooter">Mock Footer</footer>);
// Uncomment these tests when reviewing the tests for this component
// jest.mock("../Components/AllTodos", () => () => <div id="mockAllTodos">Mock All Todos</div>);
// jest.mock("../Components/AddEditTodo", () => () => <div id="mockAddEditTodo">Mock Add Edit Todos</div>);

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

  // it(`renders an AllTodos component`, () => {
  //   expect(testInstance.findByProps({ id: `mockAllTodos` })).toBeTruthy();
  // });

  // it(`renders an AddEditTodo component`, () => {
  //   expect(testInstance.findByProps({ id: `mockAddEditTodo` })).toBeTruthy();
  // });
});




