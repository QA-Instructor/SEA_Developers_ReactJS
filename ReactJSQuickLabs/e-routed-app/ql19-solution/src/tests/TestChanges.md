# Changes made to test files

## Header.test.js

**Error:** `<NavLink>` used outside a `<Router>`

**Solution:** Import `<MemoryRouter>` from `react-router-dom` and surround component in `create` call with it, then update snapshot in test

## App.test.js

### Failing Suite - `Conditional renders dependent on result of data calls`

#### Failing Test 1 & 2 - `should display the modal when postError state is true from post request` and close

**Error:** cannot find element with placeholder /todo description

**Solution:** Add step to simulate click on *Add Todo* link in header to activate the AddEditTodo component in the render - requires adding of a data-testid attribute to the Add Todo link in the Header component to help identify link

#### Failing Test 2 & 3 - Edit

These will be fixed when the edit functionality is done!
