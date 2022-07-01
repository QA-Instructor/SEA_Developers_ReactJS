import React from 'react';
import { create, act } from 'react-test-renderer';

import TodoForm from '../Components/TodoForm';

jest.mock("../Components/utils/DateCreated", () => {
    return function MockDateCreated() {
        return <span testid="dateCreated">Date Created Component</span>
    }
});

describe(`TodoForm test suite`, () => {

    let submitTodo;
    const testTodo = {
        _id: "5cc08495bf3fd62d03f2f4c1",
        todoDescription: "Sample Todo 1",
        todoDateCreated: "2019-05-04T15:00:00.000Z",
        todoCompleted: false
    };

    beforeEach(() => {
        submitTodo = jest.fn();
    });

    describe(`Render tests`, () => {

        test(`it should render a DateCreated component a date`, () => {

            const testRenderer = create(<TodoForm submitAction={submitTodo} />);
            const testInstance = testRenderer.root;

            const dateCreated = testInstance.find(
                el => el.type === `span` && el.props.testid === `dateCreated`
            );

            expect(dateCreated).toBeTruthy();
            expect(dateCreated.children).toContain(`Date Created Component`);
        });

        test('should render the todoCompleted markup when a todo is supplied', async () => {
            let testRenderer;
            await act(async () => { testRenderer = await create(<TodoForm submitAction={submitTodo} todo={testTodo} />) });

            const testInstance = testRenderer.root;
            const completedInput = testInstance.findByProps({ name: "todoCompleted" });

            expect(completedInput).toBeTruthy();
        })

    });

    describe(`onChange event tests`, () => {

        test(`it should render the new value in the input when the todoDescription onChange function is activated`, () => {
            const testValue = `Test`;

            const testRenderer = create(<TodoForm submitAction={submitTodo} />);
            const testInstance = testRenderer.root;

            const descInput = testInstance.findByProps({ name: "todoDescription" });
            expect(descInput.props.value).toBe(``);

            act(() => descInput.props.onChange({ target: { value: testValue } }));

            expect(descInput.props.value).toBe(testValue);
        });

        test(`it should render the new value in the checkbox when the todoCompleted onChange function is activated`, async () => {

            let testRenderer;

            await act(async () => { testRenderer = await create(<TodoForm submitAction={submitTodo} todo={testTodo} />) });
            const testInstance = testRenderer.root;
            const completedInput = testInstance.findByProps({ name: "todoCompleted" });

            expect(completedInput.props.checked).toEqual(testTodo.todoCompleted);

            act(() => completedInput.props.onChange({ target: { checked: !testTodo.todoCompleted } }));

            expect(completedInput.props.checked).toBe(!testTodo.todoCompleted);
        });

        test(`should enable the submit button when the todo description is populated`, () => {
            const testValue = `Test`;
            const testRenderer = create(<TodoForm submitAction={submitTodo} />);
            const testInstance = testRenderer.root;

            const descInput = testInstance.findByProps({ name: "todoDescription" });
            const submitBtn = testInstance.findByProps({ type: "submit" });

            expect(submitBtn.props.disabled).toBe(true);

            act(() => descInput.props.onChange({ target: { value: testValue } }));

            expect(submitBtn.props.disabled).toBe(false);
            expect(submitBtn.props.className).toContain(`btn-primary`);

        });

    });

    describe(`Form submission tests`, () => {

        test(`it should call submitTodo and reset the form on submission`, async () => {
            let testRenderer;
            await act(async () => { testRenderer = await create(<TodoForm submitAction={submitTodo} todo={testTodo} />) })
            const testInstance = testRenderer.root;
            const descInput = testInstance.findByProps({ name: "todoDescription" });
            const descTestValue = `Test Changer`;
            const completedInput = testInstance.findByProps({ name: "todoCompleted" });
            const form = testInstance.findByType('form');

            await act(async () => completedInput.props.onChange({ target: { checked: !testTodo.todoCompleted } }));
            await act(async () => descInput.props.onChange({ target: { value: descTestValue } }));
            await act(async () => form.props.onSubmit(new Event(`form`)));


            expect(submitTodo).toHaveBeenCalledTimes(1);
            expect(submitTodo).toHaveBeenCalledWith(descTestValue, testTodo.todoDateCreated, !testTodo.todoCompleted, testTodo._id);
            expect(descInput.props.value).toBe(``);
            expect(completedInput.props.checked).toBe(false);

        });
    });
});