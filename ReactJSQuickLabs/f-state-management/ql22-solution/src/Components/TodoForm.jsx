import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import DateCreated from './utils/DateCreated';

import { useTodosDispatch, useTodosState } from '../StateManagement/TodosProvider';
import generateTodoId from './utils/generateId';
import TodoModel from './utils/Todo.model';
import Modal from './utils/Modal';

// const TodoForm = ({ submitAction, todo }) => {
const TodoForm = ({ todo }) => {

    const [todoDescription, setTodoDescription] = useState(``);
    const [todoDateCreated, setTodoDateCreated] = useState(null);
    const [todoCompleted, setTodoCompleted] = useState(false);
    const [submitResult, setSubmitResult] = useState();
    const dispatch = useTodosDispatch();
    const { errors, success } = useTodosState();

    useEffect(() => {
        if (todo) {
            setTodoDescription(todo.todoDescription);
            setTodoDateCreated(todo.todoDateCreated);
            setTodoCompleted(todo.todoCompleted);
        }

        return (() => {
            setTodoDescription(``);
            setTodoDateCreated(null);
            setTodoCompleted(false);
        });
    }, [todo]);

    useEffect(() => {
        if (errors?.post || errors?.put) {
            setSubmitResult({ message: errors.post ?? errors.put });
        }

        if (success) {
            setSubmitResult({ message: success });
        }

        return (() => setSubmitResult(null));
    }, [errors, success]);

    const createTodo = () => {
        const todoId = todo ? todo._id : generateTodoId();
        return new TodoModel(todoDescription, new Date(todoDateCreated).toISOString(), todoCompleted, todoId);
    }

    const handleSubmit = event => {
        event.preventDefault();
        // submitAction(todoDescription, todoDateCreated, todoCompleted, todo?._id);
        // setTodoDescription(``);
        // setTodoDateCreated(null);
        // setTodoCompleted(false);
        const type = todo ? `editTodo` : `addTodo`;
        const payload = createTodo();
        dispatch({ type, payload });
    }

    const closeModalHandler = () => {
        setSubmitResult({ ...submitResult, read: true });
        dispatch({ type: `clearAddEditMessages` });
    }

    return (
        <>
            { submitResult?.read && <Redirect to="/" />}
            { submitResult && !submitResult?.read && <Modal handleClose={closeModalHandler} message={submitResult.message} />}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="todoDescription">Description:&nbsp;</label>
                    <input
                        type="text"
                        name="todoDescription"
                        placeholder="Todo description"
                        className="form-control"
                        value={todoDescription}
                        onChange={event => setTodoDescription(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="todoDateCreated">Created on:&nbsp;</label>
                    {todo && `${new Date(todo.todoDateCreated).toLocaleDateString()} @ ${new Date(todo.todoDateCreated).toLocaleTimeString()}`}
                    {!todo && <DateCreated updateDateCreated={dateCreated => setTodoDateCreated(dateCreated)} />}
                </div>
                {todo &&
                    <div className="form-group">
                        <label htmlFor="todoCompleted">Completed:&nbsp;</label>
                        <input
                            type="checkbox"
                            name="todoCompleted"
                            checked={todoCompleted}
                            onChange={event => setTodoCompleted(event.target.checked)}
                            data-testid="completedCB"
                        />
                    </div>
                }
                <div className="form-group">
                    <input type="submit" value="Submit" className={`btn ${!todoDescription ? `btn-danger` : `btn-primary`}`} disabled={!todoDescription} />
                </div>
            </form>
        </>
    );
};

TodoForm.propTypes = {
    // submitAction: PropTypes.func.isRequired,
    todo: PropTypes.exact({
        todoDescription: PropTypes.string,
        todoDateCreated: PropTypes.string,
        todoCompleted: PropTypes.bool,
        _id: PropTypes.string
    })
}

export default TodoForm;
