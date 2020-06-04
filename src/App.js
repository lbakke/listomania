import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import About from './components/about';


function App() {
  return (
    <div className="App">
      <Router>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to="/listomania/about">About</Link>
        <Route path="/listomania/about" component="about"/>
      </header>
      </Router>
    </div>
  );
}

export default App;
