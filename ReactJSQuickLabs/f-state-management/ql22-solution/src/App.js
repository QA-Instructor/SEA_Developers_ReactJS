import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'popper.js';
import 'jquery';
import './Components/css/qa.css';


import Header from './Components/Header';
import Footer from './Components/Footer';
import AllTodos from './Components/AllTodos';
import TodosProvider from './StateManagement/TodosProvider';
import NotFound from './Components/utils/NotFound';
import AddEditTodo from './Components/AddEditTodo';


function App() {

  return (
    <Router>
      <div className="container">
        <Header />
        <div className="container">
          <TodosProvider>
            <Switch>
              <Route path="/add">
                <AddEditTodo />
              </Route>
              <Route path="/edit/:_id">
                <AddEditTodo />
              </Route>
              <Route exact path="/">
                <AllTodos />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </TodosProvider>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
