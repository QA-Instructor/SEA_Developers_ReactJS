import TodoModel from '../Components/utils/Todo.model';

test(`It should create the expected object when the constuctor is called`, () => {
    const [todoDescription, todoDateCreated, todoCompleted, _id] = [`Test`, `2019-11-27T15:30:00.000Z`, false, 1];

    const testTodo = new TodoModel(todoDescription, todoDateCreated, todoCompleted, _id);

    expect(testTodo.todoDescription).toBe(todoDescription);
    expect(testTodo.todoDateCreated).toBe(todoDateCreated);
    expect(testTodo.todoCompleted).toBe(todoCompleted);
    expect(testTodo._id).toBe(_id);
    expect(testTodo).toBeInstanceOf(TodoModel);

})