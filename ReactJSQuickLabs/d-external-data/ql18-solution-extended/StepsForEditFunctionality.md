# Steps Taken to Include the Edit Todo Functionality

## 1. Change the link in the Todo component to select the todo to edit

### Write test to see if a function called selectTodo is called when a span with id of link is clicked

1. Open **/tests/Todo.test.js**
2. Add a test suite for **Todo event tests**
3. Add a test that checks to see if the `selectTodo` function is called when the `span` is clicked
   1. Mock the `selectTodo` function
   2. Create a `testTodo`
   3. Set the `todoCompleted` property to `false`
   4. Create a `testInstance`
   5. Obtain the `span`
   6. Call `onClick` from the `span`'s `props`
   7. Assert that the `selectTodo` function was called with the `testTodo`
4. Save the file
5. Run the tests and check that the new test fails

### Write the code to pass the test

1. Open **Todo.jsx**
2. Add a second property of `selectTodo` to the component
3. Change the `else` part of the `if` statement so that it renders a `<span>` with an `id` of `link` and an `onClick` that is set to an arrow function that calls `selectTodo` with the `todo` passed in through `props`
4. Add `selectTodo` to the `propTypes` object with a value of `PropTypes.func`
5. Save the file.

Run the tests again - you should find that your new test passes but a different one fails - fix it!

---

## 2. Change the AllTodos component to pass through the `selectTodo` function to Todo

1. Open **AllTodos.jsx**
2. Add `selectTodo` to the *props* for the component
3. Add a *prop* of `selectTodo` to the `Todo` component render passing it `selectTodo`
4. Add an additional `propType` of `selectTodo` that is a **function**
5. Save the file and check all tests still pass

---

## 3. Add the selectTodo function to App.js

1. Open **App.js**
2. Add a **state** for a `todoToEdit` that has an initial value of an *empty object*
3. Declare an *arrow function* called `selectTodo` that receives an argument of a `todo` and sets `todoToEdit` to the received `todo`
4. Add `selectTodo` as a **prop** to the *render* of `AllTodos`, passing in the *function of the same name* as its value
5. Add `todo` as a **prop** to the *render* of `AddEditTodo`, passing in `todoToEdit`

Save the file and check that all tests still pass.

## 4. Add the updateTodo functionality to App.js

1. Continue in **App.js**
2. Declare an *arrow function* called `updateTodo` that receives an argument of a `todo` and:
   1. *Tries* an `axios` `put` call to `TODOSURL` *appended with* the `_id` of the `todo` and a body of `todo`
   2. *Catches* an *error* and sets `postError` to `true`
   3. *Finally* sets `todoToEdit` to `null` and calls `getTodos`
3. Add a **prop** of `updateTodo` set to `updateTodo` to the *render* of the `AddEditTodo` component

We will rewrite the tests for **App.js** after the rest of the functionality has been created

---

## 5. Add the Edit functionality to the TodoForm Component

1. Open **TodoForm.jsx**
2. Change the `submitTodo` prop's **name** to `submitAction` across the component (i.e in the **props** and the **handleSubmit** function)
3. Add `todo?._id` to the arguments passed to `submitAction` in the `handleSubmit` function
4. Add a `useEffect` hook that sets the *3 state values* to that of the `todo` passed in through `props`, *if it is present* - the hook should have a **dependency** of the `todo`
5. In the section that renders the **Date Created**, make the current render of the `<DateCreated>` component dependent on there *NOT being* a `todo` from `props`
6. Add a conditional render before this if there is a `todo` from `props`, rendering a string that creates an instance of `Date`, using the todo's todoDateCreated property and converts it to a locale date string.  Append the string with and `@` symbol and then a `Date` instance converted to the locale time string.
7. Make the rendering of the *Todo completed markup* conditional on `todo` being present - the option should be there if a todo is being edited
8. PropTypes added to for the shape of a todo

We will modify the tests for this component when we have completed the rest of the functionality

---

## 6. Add the Edit functionality to the AddEditTodo component

1. Open **AddEditTodo.jsx**
2. Add an *arrow function* in the component called `updateTodo`, it should receive `todoDescription`, `todoDateCreated`, `todoCompleted` and `_id` as arguments
3. Inside the function, create a `const` called `updatedTodo` and make this an *instance of* the `TodoModel`
4. Call `udpdateTodo` from `props` with `updatedTodo`
5. After the updateTodo function, declare another const called submitAction and set this to be dependent on the todo from props, setting it to updateTodo if it is present and submitTodo if not`
6. Change the `submitTodo` property of the `TodoForm` render to `submitAction` (both name and value) and add a property of `todo` set to the `todo` from `props`
7. Add `updateTodo` and `todo` to the `PropTypes` object
   - `updateTodo` should be a *required function*
   - `todo` should have the *exact shape* of a `TodoModel` instance

## 7. Fix the AddEditTodo tests

1. Open **/tests/AddEditTodo.test.js**
2. Add updateTodo as a mock function and add it as a property to the creation of the AddEditTodo component.

This should fix the existing test.  Further refactoring of this file could be done to include a todo property in the rendering of the component.  This would test to see if the updateTodo function is called when this prop is supplied.  However, this functionality will be tested in new testing for the App component.

---

## 8. Fix the tests for TodoForm

1. Open **/tests/TodoForm.test.js**
2. Declare a `const` called `testTodo` at the start of the **first suite** and set the **4 keys** to any acceptable values (see `sampleTodos.json` if need be)
3. In the `create` call to render each `TodoForm` component in each test, change the **prop name** from `submitTodo` to `submitAction` (leave the value the same)
4. Add a test to check that the todoCompleted markup is rendered when a todo is supplied via props
   - Declare `testRenderer` via `let
   - Make `async` call to render the component, adding a prop of todo set to testTodo
   - Find the element with the name of todoCompleted
   - Check that it is truthy
5. For the test **it should render the new value in the checkbox when the todoCompleted onChange function is activated**:
   - Follow the same steps as 4 initially
   - Check that the current value is the same as the test todo's todoCompleted value
   - Add an act call that changes the value
   - Expect that the value is the opposite of before
6. For the test **it should call submitTodo and reset the form on submission**:
   - Modify it so that it renders the component `async`
   - Change the completedInput value by using the inverse of the testTodo todoCompleted property
   - Modify the arguments in the toHaveBeenCalledWith assertion

These steps should fix the existing tests.  Further refactoring and tests could be written to explictly test the updateTodo function in this component, but again this will be addressed in the new testing for the App component.

---

## 9. Change the tests for the App Component

These tests check what the user actually sees as the application is used.  It uses `@testing-library/react`.

At the time of writing, the dependencies for some of the `@testing-library` components included in `create-react-app` were out of date.  To fix this run the following command:

```sh
npm i --save @testing-library/dom
```

### 9.1 Remove and replace mocks

1. Remove all of the mocks currently listed (apart from `axios`) - we are going to be testing that the App component renders and behaves as we expect using logic from the other components. This is a widely accepted strategy when testing React applications.

2. Add a mock for the `DateCreated` component - as this changes every time `App` renders, its not good for a snapshot.  The mock should return a `<div>` with some text in it.

### 9.2 Clear out tests from the 'App component renders correctly' suite

As we are going to be rewriting these tests, they are no longer needed.

### 9.3 Snapshot tests

Inside the suite, we will create a test for snapshoting the App component, using a mock axios get call and returning some data.

#### 9.3.1 - Test with todo data

1. Add a test named `'it renders cirrectly with sample todos'`
2. Make the callback of this test `async`
3. Add a variable declaration for `testRenderer`
4. Make a constant called mockedGet that is a call to jest.spyOn, passing `axios` as the first argument and `"get"` as the second
5. Chain this declaration with a call to `mockResolvedValueOnce` passing in an object with a key of `data` and a value of `sampleTodos`
6. `import` the `create` function and the `act` function, aliasing it as `rtract` from `react-testing-renderer` at the top of the file
7. `await` a call to `rtract`, passing it an `async` callback that takes no arguments and sets `testRenderer` to `await` a call to `create` passing in `<App />`

This last step makes sure that the `useEffect` hook runs and that the component has completely finished rendering.

8. `expect` that the *JSON version* of `testRenderer` *matches the snapshot*.
9. `expect` that `mockedGet` *has been called*.

#### 9.3.2 - Test with error

This test is the same as the previous, except replace step 5 with:

```js
  const mockedGet = jest.spyOn(axios, "get").mockRejectedValue({error: `Get error`});
```

This creates an error condition and changes the render of the application.

#### 9.3.3 - Test with no data - loading and no todos

These tests are same as the previous, except `mockedGet` is defined as:

```js
  const mockedGet = jest.spyOn(axios, "get").mockResolvedValue({});             // for loading
  const mockedGet = jest.spyOn(axios, "get").mockResolvedValue({data: []});     // for no todo from server
```

### 9.4 Conditional Renders dependent on result of data calls

The following tests will render the tree and then make calls to add a todo and edit a todo, ensuring that the conditional rendering for the modal appears and that the application makes the correct post and put calls

1. Create a test suite with the same name as this section's title.

#### 9.4.1 - Test that the @testing-library/react render method calls our mock axios get

1. Create a test with the title `'should make a call for data'` and an `async` callback
2. The callback should define `mockedGet` as in **9.3.1**
3. `import` the `render` and `screen` functions and the `act` function aliasing it as `tlract` from `@testing-library/react`
4. Do a straight `import` of `@test-library/jest-dom/extend-expect`
5. `await` a call to `tlract` passing in an `async` callback that `await`s a call to `render` passing in `<App />`
6. `expect` the `mockedGet` function *to have been called*

#### 9.4.2 - Test that the modal displays when postError state is true when adding a todo

1. Create a test with the title `'should display the modal when postError state is true from a post request'` and an `async` callback
2. Add:

```js
  axios.get.mockResolvedValue({ data: sampleTodos });
```

This will mock any calls to `axios.get`

3. Define a *constant* called `mockedPost`, set to a call to `jest.spyOn` passing in `axios` and `"post"`
4. Chain a call to `mockRejectedValueOnce` with no arguments
5. Render the App component through `await`ing a call to `tlract` and passing in an `async` callback that `await`s a call to `render` passing in the **App** component
6. Declare a *constant* called `todoDescInput` and set this to a call to `getByPlaceholderText` on `screen`, passing in the *regular expression* `/todo description/i`
7. Declare a *constant* called `submitBtn` and set this to a call to `getByDisplayValue` on `screen`, passing in the *regular expression* `/submit/i`
8. Import `userEvent` from `@testing-library/user-event`
9. Simulate a user typing in the todo description input by calling `tlract` (non-asynchronously) passing in a callback.  This calls `type` on `userEvent`, passing in `todoDescInput` and the string `'Sample Todo'` - this does not need to be async as it only affects this component
10. Make another call to `tlract`, this time `await`ing it, passing in an `async` callback that `await`s a call to `click` on `userEvent` passing in `submitBtn` - this call affects the tree so it needs to be asynchronous.
11. Declare a *constant* called `modal` and set this to `await` a call to `findByText` on `screen`, passing in the *regular expression* `/error adding todo/i`
12. **Expect** `modal` meets the matcher `toBeInTheDocument()` (this is why `extended-matchers` is imported!)
13. **Expect** that `mockedPost` *has been called*

#### 9.4.3 - Test that the modal displays when postError is true when updating a todo

1. Create a test with the title `'should display the modal when postError state is true from a put request'` and an `async` callback
2. Add:

```js
  axios.get.mockResolvedValue({ data: sampleTodos });
```

This will mock any calls to `axios.get`

3. Define a *constant* called `mockedPut`, set to a call to `jest.spyOn` passing in `axios` and `"put"`
4. Chain a call to `mockRejectedValueOnce` with no arguments
5. Render the App component through `await`ing a call to `tlract` and passing in an `async` callback that `await`s a call to `render` passing in the **App** component
6. Declare a *constant* called `todoEditLinks` and set this to a call to `getAllByText` on `screen`, passing in the string ``Edit`` - this retrieves the links from the `AllTodos` component
7. Declare a *constant* called `todoDescInput` and set this to a call to `getByPlaceholderText` on `screen`, passing in the *regular expression* `/todo description/i`
8. Declare a *constant* called `submitBtn` and set this to a call to `getByDisplayValue` on `screen`, passing in the *regular expression* `/submit/i`
9. `await` a call to `tlract` passing in an `async` callback that calls `click` on `userEvent` passing in the *first element* of the returned `todoEditLinks` array
10. Simulate a user typing in the todo description input by calling `tlract` (non-asynchronously) passing in a callback.  This calls `type` on `userEvent`, passing in `todoDescInput` and the string `'Sample Todo'` - this does not need to be async as it only affects this component
11. Make another call to `tlract`, this time `await`ing it, passing in an `async` callback that `await`s a call to `click` on `userEvent` passing in `submitBtn` - this call affects the tree so it needs to be asynchronous
12. Declare a *constant* called `modal` and set this to `await` a call to `findByText` on `screen`, passing in the *regular expression* `/error adding todo/i`
13. **Expect** `modal` meets the matcher `toBeInTheDocument()` (this is why `extended-matchers` is imported!)
14. **Expect** that `mockedPost` *has been called*

#### 9.4.4 - Test that the modal closes

This test is the same as 9.4.3 up to step 11

12. Declare a *constant* called `modalCloseButton` that `await`s a call to `findByText` on `screen`, plassing in the *regular expression* `/close and display all todos/i`
13. `await` a call to `tlract`, passing in an `async` callback that `await`s a call to `click` on `userEvent` passing in `modalCloseButton` - this call affects the tree so it needs to be asynchronous
14. **Expect** that `modalCloseButton` meets the matcher `not.toBeInTheDocument()`

Add similar tests for the `getError` and `postError` modals.

## 10 Run the tests

Run all of the tests - they should pass - debug any errors!

Running coverage shows over 99% coverage:

| File                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
| -------------------- | ------- | -------- | ------- | ------- | ----------------- |
| All files            | 99.09   | 100      | 96.88   | 99.07   |                   |
| src                  | 100     | 100      | 100     | 100     |                   |
| App.js               | 100     | 100      | 100     | 100     |                   |
| src/Components       | 98.28   | 100      | 93.33   | 98.25   |                   |
| AddEditTodo.jsx      | 100     | 100      | 100     | 100     |                   |
| AllTodos.jsx         | 100     | 100      | 100     | 100     |                   |
| Todo.jsx             | 100     | 100      | 100     | 100     |                   |
| TodoForm.jsx         | 95.24   | 100      | 83.33   | 95.24   | 45                |
| src/Components/utils | 100     | 100      | 100     | 100     |                   |
| DateCreated.jsx      | 100     | 100      | 100     | 100     |                   |
| Modal.jsx            | 100     | 100      | 100     | 100     |                   |
