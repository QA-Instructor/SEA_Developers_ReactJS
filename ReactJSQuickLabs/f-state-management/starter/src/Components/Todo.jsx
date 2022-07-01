import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TodoModel from './utils/Todo.model';

const Todo = ({ todo }) => {
    const { todoDescription, todoDateCreated, todoCompleted, _id } = todo;
    const dateCreated = new Date(Date.parse(todoDateCreated)).toUTCString();
    const completedClassName = todoCompleted ? `completed` : ``;
    let completed;

    if (todoCompleted) {
        completed = `N/A`
    } else {
        completed = <Link to={`/edit/${_id}`} className="link">Edit</Link>
    }
    return (
        <tr>
            <td className={completedClassName}>{todoDescription}</td>
            <td className={completedClassName}>{dateCreated}</td>
            <td>{completed}</td>
        </tr>
    );
};

Todo.propTypes = {
    todo: PropTypes.instanceOf(TodoModel)
}

export default Todo;

