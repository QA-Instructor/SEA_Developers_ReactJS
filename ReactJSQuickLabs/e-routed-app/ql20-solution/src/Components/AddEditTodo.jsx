import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import './css/AddEditTodo.css';
import generateTodoId from './utils/generateId';
import TodoForm from './TodoForm';
import TodoModel from './utils/Todo.model';
import Modal from './utils/Modal';


const AddEditTodo = ({ submitAction, data }) => {

    const [todo, setTodo] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const { _id } = useParams();

    useEffect(() => {
        if (!_id) setTodo(null);
        if (_id && !todo?.error) {
            const todoToEdit = data?.todos?.find(currentTodo => currentTodo._id === _id);
            if (todoToEdit) {
                setTodo(todoToEdit)
            } else {
                setTodo({ error: `Todo could not be found` });
            }
        }
    }, [_id, data, todo])

    const submitTodo = (todoDescription, todoDateCreated, todoCompleted, todoId) => {
        const id = todoId ? todoId : generateTodoId();
        const todoToSubmit = new TodoModel(todoDescription, new Date(todoDateCreated).toISOString(), todoCompleted, id);
        submitAction(todoToSubmit);
        setSubmitted(true);
    }

    // const updateTodo = (todoDescription, todoDateCreated, todoCompleted, _id) => {
    //     const updatedTodo = new TodoModel(todoDescription, todoDateCreated, todoCompleted, _id);
    //     props.updateTodo(updatedTodo);
    // }

    // const submitAction = props.todo ? updateTodo : submitTodo;

    return (
        <>
            {submitted && <Redirect to="/" />}
            {todo?.error && <Modal handleClose={() => setTodo(null)} message={todo.error} />}
            <div className="addEditTodo row">
                <h3>{_id ? `Edit` : `Add`} Todo</h3>
            </div>
            <TodoForm submitAction={submitTodo} todo={todo} />
        </>
    );
}

AddEditTodo.propTypes = {
    submitAction: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(
        PropTypes.exact({
            _id: PropTypes.string,
            todoDescription: PropTypes.string,
            todoDateCreated: PropTypes.string,
            todoCompleted: PropTypes.bool
        })
    )
};

export default AddEditTodo;
