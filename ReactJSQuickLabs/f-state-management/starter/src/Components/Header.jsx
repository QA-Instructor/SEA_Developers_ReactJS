import React from "react";
import { Link, NavLink } from 'react-router-dom';

import logo from "./images/qalogo.svg";

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-sm">
        <Link
          to="https://www.qa.com"
          className="navbar-brand"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logo} alt="QA Ltd" style={{ width: '100px' }} />
        </Link>
        <a className="navbar-brand" href="/">
          <h1>Todo App</h1>
        </a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li>
              <NavLink to="/" className="nav-link" activeClassName="nav-link active">
                All Todos
              </NavLink>
            </li>
            <li>
              <NavLink to="/add" className="nav-link" activeClassName="nav-link active" data-testid="addTodoLink">
                Add Todo
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
