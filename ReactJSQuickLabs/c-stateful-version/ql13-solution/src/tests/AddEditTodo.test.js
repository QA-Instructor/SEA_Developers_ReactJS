import React from 'react';
import { create } from 'react-test-renderer';
import AddEditTodo from '../Components/AddEditTodo';
import TodoForm from '../Components/TodoForm';

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
    });

    test(`it should render a div with classNames 'addEditTodo row'`, () => {
        expect(testInstance.findByProps({ className: `addEditTodo row` })).toBeTruthy();
    });

    test(`it should render a TodoForm`, () => {
        expect(testInstance.findByType(TodoForm)).toBeTruthy();
    });
});
