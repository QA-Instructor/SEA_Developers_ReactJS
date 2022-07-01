import React from 'react';
import { MemoryRouter, useParams } from 'react-router-dom';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import AddEditTodo from '../Components/AddEditTodo';
import sampleTodos from '../sampleTodos.json';

import { customRender } from './__mocks__/testUtils';

jest.mock("../Components/TodoForm", () => () => <form></form>);

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn()
}));

describe('AddEditTodo tests', () => {

    let providerProps;

    beforeEach(() => {
        providerProps = {
            value: {
                todos: sampleTodos
            }
        }
    });

    describe('Edit Todo Tests', () => {


        test('should display a modal if the todo could not be found', async () => {
            useParams.mockImplementation(() => ({ _id: "abc" }));

            await act(async () => await customRender(<MemoryRouter><AddEditTodo /></MemoryRouter>, { providerProps }));

            const errMsg = await screen.findByText(/todo could not be found/i);

            expect(errMsg).toBeInTheDocument();
        });

        test('should close modal when handleClose is activated', async () => {
            useParams.mockImplementation(() => ({ _id: "abc" }));
            await act(async () => await customRender(<MemoryRouter><AddEditTodo /></MemoryRouter>, { providerProps }));

            const modalCloseButton = await screen.findByText(/Close/i);

            await act(async () => await userEvent.click(modalCloseButton));

            expect(modalCloseButton).not.toBeInTheDocument();
        });

        test('should have the title Edit Todo when the todo can be found', async () => {
            useParams.mockImplementation(() => ({ _id: sampleTodos[0]._id }));

            await act(async () => await customRender(<MemoryRouter><AddEditTodo /></MemoryRouter>, { providerProps }));

            const title = await screen.findByText(/edit todo/i);

            expect(title).toBeInTheDocument();
        });
    });

    describe('Add Todo Tests', () => {
        test('should have the title Add Todo when no _id exists', async () => {
            useParams.mockImplementation(() => ({ _id: undefined }));

            await act(async () => await customRender(<MemoryRouter><AddEditTodo /></MemoryRouter>, { providerProps }));

            const title = await screen.findByText(/add todo/i);

            expect(title).toBeInTheDocument();

        });
    });
});
