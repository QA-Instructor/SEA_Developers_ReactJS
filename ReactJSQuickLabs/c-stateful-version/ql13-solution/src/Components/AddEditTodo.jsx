import React from 'react';
import './css/AddEditTodo.css';
import TodoForm from './TodoForm';


const AddEditTodo = () => {
    return (
        <>
            <div className="addEditTodo row">
                <h3>Add/Edit Todo</h3>
            </div>
            <TodoForm />
        </>
    );
}

export default AddEditTodo;
