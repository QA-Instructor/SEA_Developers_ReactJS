import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, act } from '@testing-library/react';

import AllTodos from '../Components/AllTodos';


import sampleTodos from '../sampleTodos.json';

test(`it should render a loading message before the todos are available`, async () => {

    await act(async () => render(<MemoryRouter><AllTodos /></MemoryRouter>));

    expect(await screen.findByText(/loading/i)).toBeInTheDocument();
});

test(`it should render an error message if todos are not going to be available`, async () => {

    await act(async () => render(<MemoryRouter><AllTodos data={{ error: `Error` }} /></MemoryRouter>));

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
});

test(`it should render the correct number of Todo components based on the todo array supplied`, async () => {
    const testTodos = { todos: sampleTodos };
    await act(async () => render(<MemoryRouter><AllTodos data={testTodos} /></MemoryRouter>));

    const rows = await screen.findAllByText(/Sample Todo/i);
    expect(rows.length).toBe(4);
});

test(`it should render a single row when no todos are returned from the server without an error`, async () => {
    const testTodos = { todos: [] };
    render(<AllTodos data={testTodos} />);

    const rows = await screen.findByText(/no todos previously saved/i);
    expect(rows).toBeInTheDocument();
});