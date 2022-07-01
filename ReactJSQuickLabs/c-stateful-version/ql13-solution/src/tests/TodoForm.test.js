import React from 'react';
import { create, act } from 'react-test-renderer';

import TodoForm from '../Components/TodoForm';

jest.mock("../Components/utils/DateCreated", () => {
    return function MockDateCreated() {
        return <span testid="dateCreated">Date Created Component</span>
    }
});

describe(`TodoForm test suite`, () => {

    describe(`DateCreated function and render tests`, () => {
        test(`it should render a DateCreated component a date`, () => {

            const testRenderer = create(<TodoForm />);
            const testInstance = testRenderer.root;

            const dateCreated = testInstance.find(
                el => el.type === `span` && el.props.testid === `dateCreated`
            );

            expect(dateCreated).toBeTruthy();
            expect(dateCreated.children).toContain(`Date Created Component`);
        });
    });

    describe(`onChange event tests`, () => {

        test(`it should render the new value in the input when the todoDescription onChange function is activated`, () => {
            const testValue = `Test`;

            const testRenderer = create(<TodoForm />);
            const testInstance = testRenderer.root;

            const descInput = testInstance.findByProps({ name: "todoDescription" });
            expect(descInput.props.value).toBe(``);

            act(() => descInput.props.onChange({ target: { value: testValue } }));

            expect(descInput.props.value).toBe(testValue);
        });

        test(`it should render the new value in the checkbox when the todoCompleted onChange function is activated`, () => {
            const testValue = true;

            const testRenderer = create(<TodoForm />);
            const testInstance = testRenderer.root;
            const completedInput = testInstance.findByProps({ name: "todoCompleted" });

            expect(completedInput.props.checked).toEqual(false);

            act(() => completedInput.props.onChange({ target: { checked: testValue } }));

            expect(completedInput.props.checked).toBe(testValue);
        });

        test(`should enable the submit button when the todo description is populated`, () => {
            const testValue = `Test`;
            const testRenderer = create(<TodoForm />);
            const testInstance = testRenderer.root;

            const descInput = testInstance.findByProps({ name: "todoDescription" });
            const submitBtn = testInstance.findByProps({ type: "submit" });

            expect(submitBtn.props.disabled).toBe(true);

            act(() => descInput.props.onChange({ target: { value: testValue } }));

            expect(submitBtn.props.disabled).toBe(false);
            expect(submitBtn.props.className).toContain(`btn-primary`);

        });
    });
});