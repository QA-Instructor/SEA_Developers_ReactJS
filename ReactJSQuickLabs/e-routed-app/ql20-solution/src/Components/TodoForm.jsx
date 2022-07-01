import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DateCreated from './utils/DateCreated';

const TodoForm = ({ submitAction, todo }) => {

    const [todoDescription, setTodoDescription] = useState(``);
    const [todoDateCreated, setTodoDateCreated] = useState(null);
    const [todoCompleted, setTodoCompleted] = useState(false);

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

    const handleSubmit = event => {
        event.preventDefault();
        submitAction(todoDescription, todoDateCreated, todoCompleted, todo?._id);
        setTodoDescription(``);
        setTodoDateCreated(null);
        setTodoCompleted(false);
    }

    return (
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
            { todo &&
                <div className="form-group">
                    <label htmlFor="todoCompleted">Completed:&nbsp;</label>
                    <input
                        type="checkbox"
                        name="todoCompleted"
                        checked={todoCompleted}
                        onChange={event => setTodoCompleted(event.target.checked)}
                    />
                </div>
            }
            <div className="form-group">
                <input type="submit" value="Submit" className={`btn ${!todoDescription ? `btn-danger` : `btn-primary`}`} disabled={!todoDescription} />
            </div>
        </form>
    );
};

TodoForm.propTypes = {
    submitAction: PropTypes.func.isRequired,
    todo: PropTypes.exact({
        todoDescription: PropTypes.string,
        todoDateCreated: PropTypes.string,
        todoCompleted: PropTypes.bool,
        _id: PropTypes.string
    })
}

export default TodoForm;
