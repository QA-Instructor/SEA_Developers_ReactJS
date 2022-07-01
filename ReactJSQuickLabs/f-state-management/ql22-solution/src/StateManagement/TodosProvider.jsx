import React, { createContext, useContext, useEffect, /*useState*/ useReducer } from 'react';
import axios from 'axios';

export const TodosStateContext = createContext();
export const TodosDispatchContext = createContext();

const baseUrl = `http://localhost:4000/todos`;

const todosReducerAsyncHandler = dispatch => {
    let payload = {};
    return async action => {
        switch (action.type) {
            case `addTodo`:
                const addTodoResult = await addTodo(action.payload);
                payload = { ...addTodoResult, todos: await getAllTodos() }
                dispatch({ type: action.type, payload });
                break;
            case `editTodo`:
                const editTodoResult = await editTodo(action.payload);
                payload = { ...editTodoResult, todos: await getAllTodos() }
                dispatch({ type: action.type, payload });
                break;
            case `clearAddEditMessages`:
                dispatch({ type: action.type });
                break;
            default:
                dispatch({ type: `appError`, payload: { errorMessage: `There was an application error` } });
        }
    }
}

const todosReducer = (state, action) => {
    switch (action.type) {
        case `allTodos`:
            if (action.payload?.errorMessage) {
                return {
                    todos: null,
                    errors: { ...state.errors, get: action.payload.errorMessage }
                };
            }
            return {
                todos: action.payload,
                errors: null
            };
        case `addTodo`:
            if (action.payload.errorMessage) {
                return {
                    ...state,
                    errors: { ...state.errors, post: action.payload.errorMessage }, // Can I reduce this further?
                    success: null
                };
            }
            return {
                todos: action.payload.todos,
                errors: { ...state.errors, post: null },
                success: action.payload.successMessage
            };
        case `editTodo`:
            if (action.payload.errorMessage) {
                return {
                    ...state,
                    errors: { ...state.errors, put: action.payload.errorMessage },
                    success: null
                };
            }
            return {
                todos: action.payload.todos,
                errors: { ...state.errors, put: null },
                success: action.payload.successMessage
            };
        case `clearAddEditMessages`:
            return {
                ...state,
                errors: { ...state.errors, put: null, post: null },
                success: null
            };
        default:
            return {
                ...state,
                errors: { ...state.errors, [action.type]: action.payload.errorMessage },
                success: null
            };
    }
};

const getAllTodos = async () => {
    try {
        return (await axios.get(baseUrl)).data;
    }
    catch (error) {
        return { errorMessage: `Data not available from server: ${error.message}` };
    }
};

const addTodo = async newTodo => {
    try {
        await axios.post(baseUrl, newTodo);
        return { successMessage: `The todo was successfully added` };
    }
    catch (e) {
        return { errorMessage: `There was a problem adding the todo: ${e.message}` };
    }
};

const editTodo = async editedTodo => {
    try {
        await axios.put(`${baseUrl}/${editedTodo._id}`, editedTodo);
        return { successMessage: `The todo was successfully updated` };
    }
    catch (e) {
        return { errorMessage: `There was a problem updating the todo: ${e.message}` };
    }
}

export const useTodosState = () => {
    const context = useContext(TodosStateContext);

    if (context === undefined) {
        throw new Error(`useTodosState must be used within a TodosProvider`);
    }

    return context;
}

export const useTodosDispatch = () => {
    const context = useContext(TodosDispatchContext);

    if (context === undefined) {
        throw new Error(`useTodosDispatch must be used within a TodosProvider`);
    }

    return context;
}

const TodosProvider = ({ children }) => {
    const [state, dispatch] = useReducer(todosReducer, { todos: null, errors: {}, success: null });

    useEffect(() => {
        const getTodos = async () => {
            const payload = await getAllTodos();
            // setTodos(payload);
            dispatch({ type: `allTodos`, payload });
        };
        getTodos();
    }, []);

    return (
        <TodosStateContext.Provider value={state}>
            <TodosDispatchContext.Provider value={todosReducerAsyncHandler(dispatch)}>
                {children}
            </TodosDispatchContext.Provider>
        </TodosStateContext.Provider>
    );
};

export default TodosProvider;