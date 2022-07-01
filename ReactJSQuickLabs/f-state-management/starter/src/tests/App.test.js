import React from 'react';
import { act as rtract, create } from 'react-test-renderer';
import { render, screen, act as tlract } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import App from '../App';
import axios from 'axios';
import sampleTodos from '../sampleTodos.json';

// Mocked component as it changes state dependent on time/date affecting Snapshot tests
jest.mock("../Components/utils/DateCreated", () => () => <div>Date Created</div>);
jest.mock("axios");

describe(`App component renders correctly`, () => {

  test(`it renders correctly with sample todos`, async () => {
    let testRenderer;

    const mockedGet = jest.spyOn(axios, "get").mockResolvedValue({ data: sampleTodos });

    await rtract(async () => testRenderer = await create(<App />));

    expect(testRenderer.toJSON()).toMatchSnapshot();
    expect(mockedGet).toHaveBeenCalled();

  });

  test(`it renders correctly with error`, async () => {
    let testRenderer;

    const mockedGet = jest.spyOn(axios, "get").mockRejectedValue({ error: `Get error` });

    await rtract(async () => testRenderer = await create(<App />));

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  test(`it renders correctly with no data`, async () => {
    let testRenderer;

    const mockedGet = jest.spyOn(axios, "get").mockResolvedValue({ data: [] });

    await rtract(async () => testRenderer = await create(<App />));

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  test(`it renders correctly whilst loading`, async () => {
    let testRenderer;

    const mockedGet = jest.spyOn(axios, "get").mockResolvedValue({});

    await rtract(async () => testRenderer = await create(<App />));

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

});

describe(`Conditional renders dependent on result of data calls`, () => {

  test('should make a call for the data', async () => {
    const mockedGet = jest.spyOn(axios, "get").mockResolvedValue({ data: sampleTodos });
    await tlract(async () => await render(<App />));

    expect(mockedGet).toHaveBeenCalled();
  });

  test('should display the modal when getError is truthy', async () => {
    axios.get.mockRejectedValue({ message: `Get error` });

    await tlract(async () => {
      await render(<App />);
    });

    const modal = await screen.findByText(/todo application information/i);
    const errMsg = await screen.findAllByText(/get error/i);

    expect(modal).toBeInTheDocument();
    expect(errMsg.length).not.toBe(0);

  });


  test('should display the modal when postError state is truthy from a post request', async () => {

    axios.get.mockResolvedValue({ data: sampleTodos });

    const mockedPost = jest.spyOn(axios, "post").mockRejectedValueOnce({ message: `Post Error` });

    await tlract(async () => {
      await render(<App />);
    });

    const addLink = screen.getByTestId(`addTodoLink`);
    tlract(() => userEvent.click(addLink));

    const todoDescInput = screen.getByPlaceholderText(/todo description/i);
    const submitBtn = screen.getByDisplayValue(/submit/i);

    tlract(() => { userEvent.type(todoDescInput, 'Sample Todo'); });

    await tlract(async () => await userEvent.click(submitBtn));

    const modal = await screen.findByText(/todo application information/i);
    const errMsg = await screen.findByText(/post error/i);


    expect(mockedPost).toHaveBeenCalled();
    expect(modal).toBeInTheDocument();
    expect(errMsg).toBeInTheDocument();

  });

  test('should display the modal when putError state is true from a put request', async () => {
    axios.get.mockResolvedValue({ data: sampleTodos });

    const mockedPut = jest.spyOn(axios, "put").mockRejectedValueOnce({ message: `Put Error` });

    await tlract(async () => {
      await render(<App />);
    });

    const todoEditLinks = screen.getAllByText(`Edit`);


    await tlract(async () => { await userEvent.click(todoEditLinks[0]) });

    const todoDescInput = screen.getByPlaceholderText(/todo description/i);
    const submitBtn = screen.getByDisplayValue(/submit/i);

    tlract(() => { userEvent.type(todoDescInput, 'Sample Todo'); });

    await tlract(async () => { await userEvent.click(submitBtn) });


    const modal = await screen.findByText(/put error/i);

    expect(modal).toBeInTheDocument();
    expect(mockedPut).toHaveBeenCalled();

  });

  test('should close the modal for a put error when the button to close it is clicked', async () => {

    axios.get.mockResolvedValue({ message: `Get Error` });

    await tlract(async () => {
      await render(<App />);
    });

    const modalCloseButton = await screen.findByText(/Close/i);

    await tlract(async () => await userEvent.click(modalCloseButton));

    expect(modalCloseButton).not.toBeInTheDocument();

  });

  test('should close the modal for a post error when the button to close it is clicked', async () => {

    axios.get.mockResolvedValue({ data: sampleTodos });
    axios.post.mockRejectedValueOnce({ message: `Post Error` });

    await tlract(async () => {
      await render(<App />);
    });

    const addLink = await screen.getByTestId(`addTodoLink`);
    tlract(() => userEvent.click(addLink));

    const todoDescInput = screen.getByPlaceholderText(/todo description/i);
    const submitBtn = screen.getByDisplayValue(/submit/i);

    tlract(() => { userEvent.type(todoDescInput, 'Sample Todo'); });

    await tlract(async () => await userEvent.click(submitBtn));

    const modalCloseButton = await screen.findByText(/Close/i);

    await tlract(async () => await userEvent.click(modalCloseButton));

    expect(modalCloseButton).not.toBeInTheDocument();

  });

  test('should close the modal for a put error when the button to close it is clicked', async () => {

    axios.get.mockResolvedValue({ data: sampleTodos });
    axios.put.mockRejectedValueOnce({ message: `Put Error` });

    await tlract(async () => {
      await render(<App />);
    });

    const todoEditLinks = await screen.getAllByText(`Edit`);


    await tlract(async () => await userEvent.click(todoEditLinks[0]));

    const todoDescInput = screen.getByPlaceholderText(/todo description/i);
    const submitBtn = screen.getByDisplayValue(/submit/i);

    tlract(() => { userEvent.type(todoDescInput, 'Sample Todo'); });

    await tlract(async () => await userEvent.click(submitBtn));

    const modalCloseButton = await screen.findByText(/Close/i);

    await tlract(async () => await userEvent.click(modalCloseButton));

    expect(modalCloseButton).not.toBeInTheDocument();

  });

});