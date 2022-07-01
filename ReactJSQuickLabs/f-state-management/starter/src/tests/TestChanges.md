# Changes made to test files

## AllTodos.test.js

**Error:** `<Link>` used outside a `<Router>`

**Solution:** Import `<MemoryRouter>` from `react-router-dom` and surround component in `create` call with it, then update snapshot in test

## Todo.test.js

**Error:** `<Link>` used outside a `<Router>`

**Solution:** Import `<MemoryRouter>` from `react-router-dom` and surround component in `create` call with it, then update snapshot in test

**Error:** Can't find `<span>`

**Solution:** Replace all `<span>` with `<a>` as they are rendered in place of a `<Link>`

**Delete**

Delete the test suite `Todo event tests` as the `selectTodo` function is no longer used.

## App.test.js

### Failing Suite - `Conditional renders dependent on result of data calls`

#### Failing Test 1 & 2 - `should display the modal when postError state is true from post request` and close

**Error:** cannot find element with placeholder /todo description

**Solution:** Add step to simulate click on *Add Todo* link in header to activate the AddEditTodo component in the render - requires adding of a data-testid attribute to the Add Todo link in the Header component to help identify link

#### Failing Test 2 & 3 - Edit

These will be fixed when the edit functionality is done!

## AddEditTodo-Adding.test.js (formerly AddEditTodo.test.js)

**Error:** You should not use `<Redirect>` outside a `<Router>`

**Solution:** Import `<MemoryRouter>` from `react-router-dom` and surround component in `create` call with it, then update snapshot in test

## AddEditTodo-Editing.test.js (new file)

This new file is required for testing that the modal appears when no todo is supplied.  If it were done in the previous file, there is an `uncontrolled component` error when rendering the form - therefore it is mocked for the purposes of this test.

1. Import `React`, `MemoryRouter`, `render, screen and act as tlract`, `@testing-library/jest-dom/extend-expect`, `userEvent`, `AddEditTodo` and `sampleTodos`.
2. Mock `TodoForm` returning a empty `<form>` element
3. Mock `react-router-dom`, collecting the exports using `...jest.requireActual()` in an object and specifying `useParams` to return an object containing a key of `_id` and a value of `abc`

### Define the test suite

Have a call to `describe` that has a title and a callback function that set `submitTodo` be a `jest.fn()`.

### Test that the modal appears in these conditions

1. Define an `async` `test` to see if the **modal** appears when a *todo* cannot be found.
2. `await` a `render` of the `AddEditTodo` component that is wrapped in a `MemoryRouter` and has **props** of `submitAction` set to `submitTodo` and `data` set to an *object* with a **key** of `todos` set to `sampleTodos`.
3. Define `errMsg` as a call to `await` the `screen` and **find the text** `todo could not be found`.
4. **Expect** `errMsg` *to be in the document*.

### Test that the modal disappears when close is clicked

1. Define another `async` `test` to see if the **modal** is *removed* when the **close** is clicked.
2. Create the component as in the previous test.
3. Find the `close` text in the document and define this.
4. *Simulate* a click on `close` and `await` the `userEvent` to complete.
5. **Expect** that the **close** text is *no longer in the document*.
