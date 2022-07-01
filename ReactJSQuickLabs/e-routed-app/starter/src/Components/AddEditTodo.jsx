import React from 'react';
import PropTypes from 'prop-types';
import './css/AddEditTodo.css';
import generateTodoId from './utils/generateId';
import TodoForm from './TodoForm';
import TodoModel from './utils/Todo.model';


const AddEditTodo = props => {

    const submitTodo = (todoDescription, todoDateCreated, todoCompleted) => {
        const _id = generateTodoId();
        const newTodo = new TodoModel(todoDescription, todoDateCreated?.toISOString(), todoCompleted, _id);
        props.submitTodo(newTodo);
    }

    const updateTodo = (todoDescription, todoDateCreated, todoCompleted, _id) => {
        const updatedTodo = new TodoModel(todoDescription, todoDateCreated, todoCompleted, _id);
        props.updateTodo(updatedTodo);
    }

    const submitAction = props.todo ? updateTodo : submitTodo;

    return (
        <>
            <div className="addEditTodo row">
                <h3>{props.todo ? `Edit` : `Add`} Todo</h3>
            </div>
            <TodoForm submitAction={submitAction} todo={props.todo} />
        </>
    );
}

AddEditTodo.propTypes = {
    submitTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
    todo: PropTypes.exact({
        _id: PropTypes.string,
        todoDescription: PropTypes.string,
        todoDateCreated: PropTypes.string,
        todoCompleted: PropTypes.bool
    })
};

export default AddEditTodo;
