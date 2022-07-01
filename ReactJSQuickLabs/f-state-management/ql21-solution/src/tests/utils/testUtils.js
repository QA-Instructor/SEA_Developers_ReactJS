import React from 'react';
import { render } from '@testing-library/react';
import { TodosStateContext } from '../../StateManagement/TodosProvider';

export const customRender = (ui, { providerProps, ...renderOptions }) => {
    return render(
        <TodosStateContext.Provider {...providerProps}>{ui}</TodosStateContext.Provider>,
        renderOptions
    );
};