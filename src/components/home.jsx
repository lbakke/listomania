import React from 'react';
import logo from '../listomania-logo.png';
import '../App.css';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import Button from '@material-ui/core/Button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Ever wonder what would be on your ultimate spotify playlist?
        </p>
        <Button variant="contained">Get Crazy</Button>
        <Button variant="contained"><Link to="/listomania/about">More Info</Link></Button>
      </header>
    </div>
  );
}

export default App;