import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'popper.js';
import 'jquery';
import './Components/css/qa.css';
import sampleTodos from './sampleTodos.json';

import Header from './Components/Header';
import Footer from './Components/Footer';
import AllTodos from './Components/AllTodos';
import AddEditTodo from './Components/AddEditTodo';

function App() {
  const [todos, setTodos] = useState({});

  useEffect(() => {
    setTodos({ todos: sampleTodos });
  }, []);

  const submitTodo = todo => {
    const updatedTodos = [...todos.todos, todo];
    setTodos({ todos: updatedTodos });
  }

  return (
    <div className="container">
      <Header />
      <div className="container">
        <AllTodos data={todos} />
        <AddEditTodo submitTodo={submitTodo} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
