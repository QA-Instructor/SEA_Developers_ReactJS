import React from 'react';
import { create } from 'react-test-renderer';
import AddEditTodo from '../Components/AddEditTodo';

// Mocks can be anonymous - as here
// jest.mock(`../Components/TodoForm`, () => () => <form></form>);

// or they can be named - as here
jest.mock(`../Components/TodoForm`, () => {
    return function MockTodoForm() {
        return <form></form>
    }
});

describe(`Tests for AddEditTodo`, () => {
    let testRenderer;
    let testInstance;

    beforeEach(() => {
        testRenderer = create(<AddEditTodo />);
        testInstance = testRenderer.root;
    });

    afterEach(() => {
        testRenderer = null;
        testInstance = null;
    })

    test(`it should render a div with classNames 'addEditTodo row'`, () => {
        expect(testInstance.findByProps({ className: `addEditTodo row` })).toBeTruthy();
    });

    test(`it should render a TodoForm`, () => {
        expect(testInstance.findByType(`form`)).toBeTruthy();
    })
});
