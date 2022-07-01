import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'popper.js';
import 'jquery';
import './Components/css/qa.css';

import Header from './Components/Header';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="container">
      <Header />
      <div className="container">
        <h1>Other UIs to go here</h1>
      </div>
      <Footer />
    </div>
  );
}

export default App;
