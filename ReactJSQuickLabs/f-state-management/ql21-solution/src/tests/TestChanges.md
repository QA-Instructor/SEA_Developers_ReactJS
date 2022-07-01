# Changes made to test files

## AllTodos.test.js

**Error:** `useTodosState` used outside a `<TodosProvider>`

**Solution:**

1. Create a function called customRender in a file called testUtils in the tests/utils folder.  It should receive ui and an object containing providerProps and the current renderOptions.  The function should return a call to testing-library/react's render function supplying a `TodosStateContext.Provider` that has a collection of the `providedProps` that wraps `{ui}` and the renderOptions.

 ```javascript
import React from 'react';
import { render } from '@testing-library/react';
import { TodosStateContext } from '../../StateManagement/TodosProvider';

const customRender = (ui, { providerProps, ...renderOptions }) => {
    return render(
        <TodosStateContext.Provider {...providerProps}>{ui}</TodosStateContext.Provider>,
        renderOptions
    );
};
 ```

1. Import `customRender` function into the **AllTodos.test.js** file.
2. In each of the tests, add a `const` of `providerProps` that is an *object* that has a **key** of `value` set to an *object* that has a **key** of `todos`.  Use the `data` *property value* currently being used by the `render` function creating the component in the test as the value for the `todos` key.
3. Change the call to `render` in each test to a call to `customRender` and add a *second argument* of an *object* containing `providerProps`.

Save and run the tests.

**Error:** `findByText(/error/i)` finds multiple elements

**Cause:** We have added the Modal to this component as it receives the todos data from the Context Provider rather than through props.  Therefore, the Modal displays in this situation and this contains 2 further elements that contain the word *error*.

**Solution:** Create a suite of tests for the error to ensure that the modal is displayed and the error message appears in the table

1. Create a *suite* called `Error tests`
2. Move `providerProps` for the *error state* into the suite
3. Create an `async` `beforeEach` to render the component
4. Write a test to make sure that the word `error` is ***rendered*** (i.e. is *Truthy*)
5. Write a test to make sure that the **Modal** is displayed
6. Write a test to make sure that the **Modal** is *cleared* if **Close** is **clicked**.

## App.test.js

Snapshot tests in the first suite should still pass (after updating)

In the second suite, remove all but the first test as the mock will still be called when `App` renders (through the rendering of the `TodosProvider`)

All other tests are going to be a concern of other components as we move the dependency for data to the Provider and Reducer.