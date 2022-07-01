import React from 'react';
import { render, waitForElement, act } from '@testing-library/react';
import DateCreated from '../Components/utils/DateCreated';

describe(`DateCreated test suite`, () => {

    test(`updateDateCreated should return null if not supplied in props`, () => {
        expect(DateCreated.defaultProps.updateDateCreated).toBeDefined();
        expect(DateCreated.defaultProps.updateDateCreated()).toBeNull();
    });

    test(`it should call the updateDateCreatedFunction when the date changes`, () => {

        const mockUpdateDateCreated = jest.fn();

        render(<DateCreated updateDateCreated={mockUpdateDateCreated} />);

        jest.useFakeTimers();
        jest.runAllImmediates();

        expect(mockUpdateDateCreated).toHaveBeenCalledTimes(1);

    });

    test(`it should inially render with the date supplied by props`, async () => {
        const setInterval = jest.spyOn(window, `setInterval`);
        const mockUpdateDateCreated = jest.fn();
        let testDate = new Date(`01/01/1975 12:45:52`);
        let testOutput = `${testDate.toLocaleDateString()} @ ${testDate.toLocaleTimeString()}`;
        const { getByTestId } = render(<DateCreated updateDateCreated={mockUpdateDateCreated} dateCreated={testDate} />);

        jest.useRealTimers();

        await waitForElement(() => getByTestId(`dateCreated`));
        expect(getByTestId(`dateCreated`).textContent.trim()).toBe(testOutput);

        await act(async () => {
            jest.useFakeTimers();
            jest.advanceTimersByTime(1200);

            jest.useRealTimers();

            testDate = new Date();
            testOutput = `${testDate.toLocaleDateString()} @ ${testDate.toLocaleTimeString()}`;

            await waitForElement(() => getByTestId(`dateCreated`));
        });

        expect(setInterval).toHaveBeenCalledTimes(1);
        expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);
        expect(getByTestId(`dateCreated`).textContent.trim()).toBe(testOutput);
    });


});