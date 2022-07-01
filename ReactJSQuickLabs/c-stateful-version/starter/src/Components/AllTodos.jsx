import React from 'react';
import './css/AllTodos.css';
import sampleTodos from '../sampleTodos.json';
import TodoModel from './utils/Todo.model';

import Todo from './Todo';

const AllTodos = () => {
    const todos = sampleTodos.map(currentTodo => {
        const todo = new TodoModel(currentTodo.todoDescription, currentTodo.todoDateCreated, currentTodo.todoCompleted, currentTodo._id);
        return <Todo todo={todo} key={todo._id} />
    });
    return (
        <div className="row">
            <h3>Todos List</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Date Created</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{todos}</tbody>
            </table>
        </div>
    );
};

export default AllTodos;


