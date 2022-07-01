import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, act as tlract } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import AddEditTodo from '../Components/AddEditTodo';
import sampleTodos from '../sampleTodos.json';

jest.mock("../Components/TodoForm", () => () => <form></form>);

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({ _id: "abc" })
}));

describe('Edit Todo Tests', () => {

    const submitTodo = jest.fn();

    test('should display a modal if the todo could not be found', async () => {

        await tlract(async () => await render(<MemoryRouter><AddEditTodo submitAction={submitTodo} data={{ todos: sampleTodos }} /></MemoryRouter>));

        const errMsg = await screen.findByText(/todo could not be found/i);

        expect(errMsg).toBeInTheDocument();
    });

    test('should close modal when handleClose is activated', async () => {
        await tlract(async () => await render(<MemoryRouter><AddEditTodo submitAction={submitTodo} data={{ todos: sampleTodos }} /></MemoryRouter>));

        const modalCloseButton = await screen.findByText(/Close/i);

        await tlract(async () => await userEvent.click(modalCloseButton));

        expect(modalCloseButton).not.toBeInTheDocument();
    });
});
