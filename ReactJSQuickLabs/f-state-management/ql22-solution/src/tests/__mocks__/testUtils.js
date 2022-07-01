import React from 'react';
import { render } from '@testing-library/react';
import { TodosStateContext, TodosDispatchContext } from '../../StateManagement/TodosProvider';

export const customRender = (ui, { providerProps, ...renderOptions }) => {
    return render(
        <TodosStateContext.Provider {...providerProps}>{ui}</TodosStateContext.Provider>,
        renderOptions
    );
};

export const customRenderStateAndDispatchContexts = (ui, stateProviderProps, dispatchProviderProps, ...renderOptions) => {
    return render(
        <TodosStateContext.Provider {...stateProviderProps}>
            <TodosDispatchContext.Provider value={dispatchProviderProps}>
                {ui}
            </TodosDispatchContext.Provider>
        </TodosStateContext.Provider>,
        renderOptions
    );
};