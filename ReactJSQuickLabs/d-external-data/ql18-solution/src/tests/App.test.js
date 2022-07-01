import React from 'react';
import { act, create } from 'react-test-renderer';
import App from '../App';
import axios from 'axios';
import sampleTodos from '../sampleTodos.json';


jest.mock("../Components/Header", () => () => <header testid="mockHeader">Mock Header</header>);
jest.mock("../Components/Footer", () => () => <footer testid="mockFooter">Mock Footer</footer>);
jest.mock("../Components/AllTodos", () => () => <div testid="mockAllTodos">Mock AllTodos</div>);
jest.mock("../Components/AddEditTodo", () => () => <div testid="mockAddEditTodo">Mock AddEditTodos</div>);
jest.mock("../Components/utils/Modal", () => () => <div testid="mockModal">Mock Modal</div>);
jest.mock('axios');

describe(`App component renders correctly`, () => {

  let testRenderer;
  let testInstance;
  let mockedGet;

  beforeEach(async () => {
    mockedGet = jest.spyOn(axios, "get").mockResolvedValueOnce({ data: { todos: sampleTodos } });
    await act(async () => {
      testRenderer = await create(<App />);
      testInstance = testRenderer.root;
    });
  });

  afterEach(() => {
    testRenderer = null;
    testInstance = null;
  });

  it(`renders a Header component`, () => {
    expect(testInstance.findByProps({ testid: 'mockHeader' })).toBeTruthy();
  });

  it(`renders a Footer component`, () => {
    expect(testInstance.findByProps({ testid: 'mockFooter' })).toBeTruthy();
  });

  it(`renders an AllTodos component`, () => {
    expect(testInstance.findByProps({ testid: `mockAllTodos` })).toBeTruthy();
  });

  it(`renders an AddEditTodo component`, () => {
    expect(testInstance.findByProps({ testid: `mockAddEditTodo` })).toBeTruthy();
  });

});

describe(`App component makes external calls using axios`, () => {

  it('should call the axios get method when first rendered - i.e. useEffect called', async () => {

    const mockedGet = jest.spyOn(axios, "get").mockResolvedValueOnce({ data: { todos: sampleTodos } });

    await act(async () => { await create(<App />); });

    expect(mockedGet).toHaveBeenCalled();

  });

  it(`should catch an error from an axios call and continue when useEffect called`, async () => {
    const mockedGet = jest.spyOn(axios, "get").mockRejectedValueOnce({ message: `Error` });

    await act(async () => await create(<App />));

    expect(mockedGet).toHaveBeenCalled();
  });

});
