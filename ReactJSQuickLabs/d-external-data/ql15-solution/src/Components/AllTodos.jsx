import React from 'react';
import PropTypes from 'prop-types';
import './css/AllTodos.css';

import Todo from './Todo';
import TodoModel from './utils/Todo.model';

const AllTodos = ({ data }) => {

    const todos = data.todos?.map(currentTodo => {
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

AllTodos.propTypes = {
    data: PropTypes.exact({
        todos: PropTypes.arrayOf(
            PropTypes.exact({
                _id: PropTypes.string,
                todoDescription: PropTypes.string,
                todoDateCreated: PropTypes.string,
                todoCompleted: PropTypes.bool
            })
        )
    })
};

export default AllTodos;

