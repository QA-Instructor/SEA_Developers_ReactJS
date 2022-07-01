import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, act, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { customRenderStateAndDispatchContexts } from './__mocks__/testUtils';

import TodoForm from '../Components/TodoForm';
import sampleTodos from '../sampleTodos.json';
import axios from 'axios';
import TodosProvider from '../StateManagement/TodosProvider';

jest.mock("../Components/utils/DateCreated", () => {
    return function MockDateCreated() {
        return <span testid="dateCreated">Date Created Component</span>
    }
});

jest.mock("../Components/utils/generateId", () => (
    function generateTodoId() { return 1 }
));

jest.mock("axios");

describe(`TodoForm test suite`, () => {

    let providerProps;
    let dispatch;
    let dispatchProviderProps;

    describe(`Edit tests`, () => {

        beforeEach(() => {
            providerProps = { value: { todos: undefined, errors: {}, success: null } };
            dispatch = jest.fn();
            dispatchProviderProps = jest.fn(dispatch);
        });


        test(`should render the component initially`, async () => {
            let container;

            await act(async () => container = await customRenderStateAndDispatchContexts(<TodoForm />, providerProps, dispatchProviderProps));

            expect(container).toMatchSnapshot();
        });

        test('should have a todo already on the form if a todo is supplied in props', async () => {

            await act(async () => await customRenderStateAndDispatchContexts(<TodoForm todo={sampleTodos[0]} />, providerProps, dispatchProviderProps));

            const testDescription = sampleTodos[0].todoDescription;

            const todoDescription = await screen.findByDisplayValue(testDescription);

            expect(todoDescription.value).toBe(testDescription);

        });

        test('should have an enabled submit button if there is already a todo on the form', async () => {

            await act(async () => await customRenderStateAndDispatchContexts(<TodoForm todo={sampleTodos[0]} />, providerProps, dispatchProviderProps));

            const testDescription = sampleTodos[0].todoDescription;

            const todoDescription = await screen.findByDisplayValue(testDescription);
            const submitBtn = await screen.findByDisplayValue(/submit/i);

            expect(todoDescription.value).toBe(testDescription);
            expect(submitBtn.disabled).toBeFalsy();

        });

        test('should have a Completed checkbox if there is a todo supplied by props', async () => {

            await act(async () => await customRenderStateAndDispatchContexts(<TodoForm todo={sampleTodos[0]} />, providerProps, dispatchProviderProps));

            const completedCB = await screen.findByText(/completed/i);

            expect(completedCB).toBeInTheDocument();

        });

        test('should have a completed checkbox should change state when clicked', async () => {

            await act(async () => await customRenderStateAndDispatchContexts(<TodoForm todo={sampleTodos[3]} />, providerProps, dispatchProviderProps));

            const completedCB = await screen.findByTestId(/completedCB/i);

            expect(completedCB.checked).toBeFalsy();

            act(() => { userEvent.click(completedCB); });

            expect(completedCB.checked).toBeTruthy();

        });

        test('should display a modal with a success message when the submit button is clicked and a success response is given', async () => {
            axios.put.mockResolvedValueOnce({ data: sampleTodos[0] });

            providerProps = { value: { todos: sampleTodos, errors: {}, success: `The todo was successfully updated` } };
            dispatch = jest.fn();
            dispatchProviderProps = jest.fn(dispatch);

            await act(async () => await customRenderStateAndDispatchContexts(<TodoForm />, providerProps, dispatchProviderProps));

            const modalTitle = await screen.findByText(/todo application information/i);

            const successMessage = await screen.findByText(providerProps.value.success);

            expect(modalTitle).toBeInTheDocument();
            expect(successMessage).toBeInTheDocument();
        });

        test('should close the modal when close is clicked', async () => {

            providerProps = { value: { todos: sampleTodos, errors: {}, success: `The todo was successfully updated` } };
            dispatch = jest.fn();
            dispatchProviderProps = jest.fn(dispatch);

            await act(async () => await customRenderStateAndDispatchContexts(<MemoryRouter><TodoForm /></MemoryRouter>, providerProps, dispatchProviderProps));

            const modalClose = await screen.findByText(/close/i);

            await act(async () => await userEvent.click(modalClose));

            expect(modalClose).not.toBeInTheDocument();
        });

        test('should display an error modal when the server returns an error', async () => {
            providerProps = { value: { todos: sampleTodos, errors: { put: `put error` }, success: null } };
            dispatch = jest.fn();
            dispatchProviderProps = jest.fn(dispatch);

            await act(async () => await customRenderStateAndDispatchContexts(<MemoryRouter><TodoForm /></MemoryRouter>, providerProps, dispatchProviderProps));

            const modalTitle = await screen.findByText(/todo application information/i);

            const errorMessage = await screen.findByText(providerProps.value.errors.put);

            expect(modalTitle).toBeInTheDocument();
            expect(errorMessage).toBeInTheDocument();
        });


        test('should close the modal when close is clicked', async () => {

            providerProps = { value: { todos: sampleTodos, errors: { put: `put error` }, success: null } };
            dispatch = jest.fn();
            dispatchProviderProps = jest.fn(dispatch);

            await act(async () => await customRenderStateAndDispatchContexts(<MemoryRouter><TodoForm /></MemoryRouter>, providerProps, dispatchProviderProps));

            const modalClose = await screen.findByText(/close/i);

            await act(async () => await userEvent.click(modalClose));

            expect(modalClose).not.toBeInTheDocument();
        });
    });

    describe('Add Render tests', () => {

        test('should have an disabled submit button if there is no todo in props', async () => {

            await act(async () => await customRenderStateAndDispatchContexts(<TodoForm />, providerProps, dispatchProviderProps));

            const submitBtn = await screen.findByDisplayValue(/submit/i);

            expect(submitBtn.disabled).toBeTruthy();

        });

        test('should have an enabled submit button when the description box is typed into', async () => {

            await act(async () => await customRenderStateAndDispatchContexts(<TodoForm />, providerProps, dispatchProviderProps));

            const submitBtn = await screen.findByDisplayValue(/submit/i);

            expect(submitBtn.disabled).toBeTruthy();

            const todoDescInput = screen.getByPlaceholderText(/todo description/i);

            act(() => { userEvent.type(todoDescInput, 'Sample Todo'); });

            expect(submitBtn.disabled).toBeFalsy();
        });

    });

    describe('Submit Tests', () => {
        test('should call dispatch with correct action type and payload when editing', async () => {
            providerProps = { value: { todos: sampleTodos, errors: {}, success: null } };
            dispatch = jest.fn();
            dispatchProviderProps = jest.fn(dispatch);

            await act(async () => await customRenderStateAndDispatchContexts(<TodoForm todo={sampleTodos[3]} />, providerProps, dispatchProviderProps));

            const submitBtn = await screen.findByDisplayValue(/submit/i);

            act(() => { userEvent.click(submitBtn); });

            expect(dispatch).toHaveBeenCalledWith({ type: `editTodo`, payload: sampleTodos[3] });
        });

        test('should call dispatch with correct action type and payload when adding', async () => {
            providerProps = { value: { todos: sampleTodos, errors: {}, success: null } };
            dispatch = jest.fn();
            dispatchProviderProps = jest.fn(dispatch);

            await act(async () => await customRenderStateAndDispatchContexts(<TodoForm />, providerProps, dispatchProviderProps));

            const submitBtn = await screen.findByDisplayValue(/submit/i);
            const todoDescInput = screen.getByPlaceholderText(/todo description/i);

            act(() => { userEvent.type(todoDescInput, 'Sample Todo'); });
            act(() => { userEvent.click(submitBtn); });


            expect(dispatch).toHaveBeenCalled();
        });
    });
});

describe('tests for using the provider', () => {

    test('should render the form with a success modal when a todo is successfully added', async () => {
        axios.post.mockResolvedValue({ data: { todo: `Added` } });

        await act(async () => await render(<MemoryRouter><TodosProvider><TodoForm /></TodosProvider></MemoryRouter>));

        const submitBtn = await screen.findByDisplayValue(/submit/i);
        const todoDescInput = screen.getByPlaceholderText(/todo description/i);

        await act(async () => { await userEvent.type(todoDescInput, 'Sample Todo'); });
        await act(async () => { await userEvent.click(submitBtn); });

        const modalTitle = await screen.findByText(/todo application information/i);

        const successMessage = await screen.findByText(/the todo was successfully added/i);

        expect(modalTitle).toBeInTheDocument();
        expect(successMessage).toBeInTheDocument();
    });

    test('should render the form with an error modal when a todo is not added', async () => {
        axios.post.mockRejectedValue({ e: { message: `not added` } });

        await act(async () => await render(<MemoryRouter><TodosProvider><TodoForm /></TodosProvider></MemoryRouter>));

        const submitBtn = await screen.findByDisplayValue(/submit/i);
        const todoDescInput = screen.getByPlaceholderText(/todo description/i);

        await act(async () => { await userEvent.type(todoDescInput, 'Sample Todo'); });
        await act(async () => { await userEvent.click(submitBtn); });

        const modalTitle = await screen.findByText(/todo application information/i);

        const errorMessage = await screen.findByText(/There was a problem adding the todo/i);

        expect(modalTitle).toBeInTheDocument();
        expect(errorMessage).toBeInTheDocument();
    });

    test('should render the form with a success modal when a todo is successfully updated', async () => {
        axios.put.mockResolvedValue({ data: { todo: `Updated` } });

        await act(async () => await render(<MemoryRouter><TodosProvider><TodoForm todo={sampleTodos[3]} /></TodosProvider></MemoryRouter>));

        const submitBtn = await screen.findByDisplayValue(/submit/i);
        const todoDescInput = screen.getByPlaceholderText(/todo description/i);

        await act(async () => { await userEvent.click(submitBtn); });

        const modalTitle = await screen.findByText(/todo application information/i);

        const successMessage = await screen.findByText(/the todo was successfully updated/i);

        expect(modalTitle).toBeInTheDocument();
        expect(successMessage).toBeInTheDocument();
    });

    test('should render the form with an error modal when a todo is not updated', async () => {
        axios.put.mockRejectedValue({ e: { message: `not updated` } });

        await act(async () => await render(<MemoryRouter><TodosProvider><TodoForm todo={sampleTodos[3]} /></TodosProvider></MemoryRouter>));

        const submitBtn = await screen.findByDisplayValue(/submit/i);

        await act(async () => { await userEvent.click(submitBtn); });

        const modalTitle = await screen.findByText(/todo application information/i);

        const errorMessage = await screen.findByText(/There was a problem updating the todo/i);

        expect(modalTitle).toBeInTheDocument();
        expect(errorMessage).toBeInTheDocument();
    });

    test('should close the modal when Close is clicked, clearing any error messages', async () => {

        axios.put.mockRejectedValue({ e: { message: `not updated` } });

        await act(async () => await render(<MemoryRouter><TodosProvider><TodoForm todo={sampleTodos[3]} /></TodosProvider></MemoryRouter>));

        const submitBtn = await screen.findByDisplayValue(/submit/i);

        await act(async () => { await userEvent.click(submitBtn); });

        const modalTitle = await screen.findByText(/todo application information/i);

        const close = await screen.findByText(/close/i);

        await act(async () => await userEvent.click(close));

        expect(modalTitle).not.toBeInTheDocument();
        expect(close).not.toBeInTheDocument();

    })
});
