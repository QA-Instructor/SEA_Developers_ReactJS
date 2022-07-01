import React from 'react';
import DateCreated from './utils/DateCreated';

const TodoForm = () => {

    return (
        <form>
            <div className="form-group">
                <label htmlFor="todoDescription">Description:&nbsp;</label>
                <input type="text" name="todoDescription" placeholder="Todo description" className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="todoDateCreated">Created on:&nbsp;</label>
                <DateCreated />
            </div>
            <div className="form-group">
                <label htmlFor="todoCompleted">Completed:&nbsp;</label>
                <input type="checkbox" name="todoCompleted" />
            </div>
            <div className="form-group">
                <input type="submit" value="Submit" className="btn btn-primary" />
            </div>
        </form>
    );
};

export default TodoForm;
