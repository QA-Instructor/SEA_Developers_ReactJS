import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AllTodos from '../Components/AllTodos';
import sampleTodos from '../sampleTodos.json';
import { customRender } from './__mocks__/testUtils';


test(`it should render a loading message before the todos are available`, async () => {

    const providerProps = {
        value: {
            todos: undefined
        }
    };

    await act(async () => await customRender(<MemoryRouter><AllTodos /></MemoryRouter>, { providerProps }));

    expect(await screen.findByText(/loading/i)).toBeInTheDocument();
});

describe(`Error tests`, () => {

    const providerProps = {
        value: {
            errors: { get: `get Error` },
        }
    };

    beforeEach(async () => {
        await act(async () => await customRender(<MemoryRouter><AllTodos /></MemoryRouter>, { providerProps }));
    })

    test(`it should render an error messages if todos are not going to be available`, async () => {

        const errorMessages = await screen.findAllByText(/error/i);

        expect(errorMessages.length).toBeTruthy();
    });

    test('should render a Modal if todos are not available', async () => {

        const modalTitle = await screen.findByText(/todo application information/i);

        expect(modalTitle).toBeInTheDocument();
    });

    test('should clear the modal if the Close is clicked', async () => {

        const close = await screen.findByText(/close/i);

        await act(async () => await userEvent.click(close));

        expect(close).not.toBeInTheDocument();
    });


});


test(`it should render the correct number of Todo components based on the todo array supplied`, async () => {

    const providerProps = {
        value: {
            todos: sampleTodos
        }
    };

    await act(async () => customRender(<MemoryRouter><AllTodos /></MemoryRouter>, { providerProps }));

    const rows = await screen.findAllByText(/Sample Todo/i);
    expect(rows.length).toBe(4);
});

test(`it should render a single row when no todos are returned from the server without an error`, async () => {

    const providerProps = {
        value: {
            todos: []
        }
    };

    await act(async () => await customRender(<MemoryRouter><AllTodos /></MemoryRouter>, { providerProps }));

    const rows = await screen.findByText(/no todos previously saved/i);
    expect(rows).toBeInTheDocument();
});