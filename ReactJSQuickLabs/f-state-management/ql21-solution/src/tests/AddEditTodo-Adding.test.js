import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { create, act as rtract } from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import AddEditTodo from '../Components/AddEditTodo';
import TodoForm from '../Components/TodoForm';

describe(`Tests for AddEditTodo when adding`, () => {

    let testRenderer;
    let testInstance;
    let submitTodo;

    describe(`Add todo tests`, () => {
        beforeEach(() => {
            submitTodo = jest.fn();
            testRenderer = create(<MemoryRouter><AddEditTodo submitAction={submitTodo} /></MemoryRouter>);
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

        test(`it should call submitTodo when submitTodo is called from props on TodoForm`, () => {
            const todoDescription = `Test`;
            const todoDateCreated = new Date(`01/01/1975 12:45:52`);
            const todoCompleted = false;
            const todoForm = testInstance.findByType(TodoForm);

            rtract(() => {
                todoForm.props.submitAction(todoDescription, todoDateCreated, todoCompleted);
            });

            expect(submitTodo).toHaveBeenCalledTimes(1);
        });

        test(`it should render a div with classNames 'addEditTodo row'`, () => {
            expect(testInstance.findByProps({ className: `addEditTodo row` })).toBeTruthy();

        });
    });

});