import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'popper.js';
import 'jquery';
import './Components/css/qa.css';
import axios from 'axios';

import Header from './Components/Header';
import Footer from './Components/Footer';
import AllTodos from './Components/AllTodos';
import AddEditTodo from './Components/AddEditTodo';
import Modal from './Components/utils/Modal';
import NotFound from './Components/utils/NotFound';

const TODOSURL = `http://localhost:4000/todos`;

function App() {
  const [todos, setTodos] = useState({});
  const [getError, setGetError] = useState(``);
  const [postError, setPostError] = useState(``);
  const [putError, setPutError] = useState(``);

  useEffect(() => {
    const getData = async () => {
      setTodos(await getTodos());
    }
    getData();
  }, []);

  const getTodos = async () => {
    try {
      const res = await axios.get(TODOSURL);
      return res.data.length ? ({ todos: res.data }) : ({ error: `There are no todos stored` });
    }
    catch (e) {
      setGetError(`Data not available from server: ${e.message}`)
      return ({ error: `Data not available from server: ${e.message}` });
    }
  };

  const submitTodo = async todo => {
    setPostError(``);
    try {
      await axios.post(TODOSURL, todo);

    } catch (e) {
      setPostError(`There was a problem adding the todo: ${e.message}`);
    } finally {
      setTodos(await getTodos());
    }
  }

  const updateTodo = async todo => {
    setPutError(``);
    try {
      await axios.put(`${TODOSURL}/${todo._id}`, todo);

    } catch (e) {
      setPutError(`There was a problem updating the todo: ${e.message}`);
    } finally {
      setTodos(await getTodos());
    }
  };

  return (
    <Router>
      {getError && <Modal handleClose={() => setGetError(``)} message={getError} />}
      {putError && <Modal handleClose={() => setPutError(``)} message={putError} />}
      {postError && <Modal handleClose={() => setPostError(``)} message={postError} />}
      <div className="container">
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/">
              <AllTodos data={todos} />
            </Route>
            <Route path="/add">
              <AddEditTodo submitAction={submitTodo} />
            </Route>
            <Route path="/edit/:_id">
              <AddEditTodo submitAction={updateTodo} data={todos} />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
