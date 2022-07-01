import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import './css/AllTodos.css';

import Todo from './Todo';
import TodoModel from './utils/Todo.model';
import Modal from './utils/Modal';
import { useTodosState } from '../StateManagement/TodosProvider';

const AllTodos = () => {
    const [dataStatus, setDataStatus] = useState({ name: `loading`, message: `Data is loading...` });

    const { todos, errors } = useTodosState();

    useEffect(() => {
        if (errors?.get) {
            setDataStatus({ name: `error`, message: errors.get });
        }
        else if (todos) {
            const ds = todos.length ? { name: `data`, message: null } : { name: `nodata`, message: `There were no todos previously saved` };
            setDataStatus(ds);
        }
        else {
            setDataStatus({ name: `loading`, message: `Data is loading...` });
        }
    }, [todos, errors]);

    const populateTable = () => {

        if (todos?.length > 0) {
            return todos.map(currentTodo => {
                const { todoDescription, todoDateCreated, todoCompleted, _id } = currentTodo;
                const todo = new TodoModel(todoDescription, todoDateCreated, todoCompleted, _id);
                // return <Todo todo={todo} key={todo._id} selectTodo={() => { }} />;
                return <Todo todo={todo} key={todo._id} />;
            });
        }

        return (
            <tr><td id={dataStatus.name} colSpan="3">{dataStatus.message}</td></tr>
        );
    };

    return (
        <>
            {dataStatus.name === `error` && <Modal handleClose={() => setDataStatus({ name: `confirmedError`, message: dataStatus.message })} message={dataStatus.message} />}
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
                    <tbody>{populateTable()}</tbody>
                </table>
            </div>
        </>
    );
};

// AllTodos.propTypes = {
//     data: PropTypes.oneOfType([
//         PropTypes.exact({
//             todos: PropTypes.arrayOf(
//                 PropTypes.exact({
//                     _id: PropTypes.string,
//                     todoDescription: PropTypes.string,
//                     todoDateCreated: PropTypes.string,
//                     todoCompleted: PropTypes.bool
//                 })
//             )
//         }),
//         PropTypes.exact({
//             error: PropTypes.string
//         }),
//         PropTypes.exact({})
//     ]),
//     selectTodo: PropTypes.func
// };

export default AllTodos;