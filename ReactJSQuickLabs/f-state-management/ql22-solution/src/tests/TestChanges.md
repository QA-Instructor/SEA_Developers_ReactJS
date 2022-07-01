# Changes made to test files

## AllTodos.test.js

### Error tests

**Error:** Unable to find an element with the text: /error/i. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.

**Cause:** The way that state is supplied to the components through the provider has changed so it is an object with keys `todos`, `errors` and `success`

**Solution:** Change the **key** in the `providerProps` from `todos` to `errors` and supply an **object** with a **key** of `get` and a **value string** of `get Error`.

This returns the test coverage of the component to 100%.
