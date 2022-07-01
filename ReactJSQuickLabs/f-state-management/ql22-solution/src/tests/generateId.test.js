import generateTodoId from '../Components/utils/generateId';

test(`it should return a string that matches the pattern`, () => {
    const idRegEx = new RegExp(/^[0-9a-fA-F]{24}$/);

    const testId = generateTodoId();

    expect(idRegEx.test(testId)).toBe(true);

})