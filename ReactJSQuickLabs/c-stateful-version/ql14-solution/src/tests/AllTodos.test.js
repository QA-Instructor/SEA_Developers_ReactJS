import React from 'react';
import { create } from 'react-test-renderer';
import AllTodos from '../Components/AllTodos';
import sampleTodos from '../sampleTodos.json';

test(`it should render the correct number of Todo components based on the todo array supplied`, () => {

    const sampleTodosLength = sampleTodos.length;

    const testRenderer = create(<AllTodos data={{ todos: sampleTodos }} />);
    const testInstance = testRenderer.root;

    const tableBody = testInstance.findByType(`tbody`);

    expect(tableBody.children.length).toBe(sampleTodosLength);
});