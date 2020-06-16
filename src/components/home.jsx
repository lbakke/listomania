import React, { Component } from 'react'
import logo from '../listomania-logo.png';
import '../App.css';

import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import SpotifyWebApi from 'spotify-web-api-js';

import ReactDOM from 'react-dom';
import SpotifyLogin from 'react-spotify-login';
import { clientId, redirectUri } from './settings.jsx';
 
const onSuccess = function(response) {
  console.log(response);
  console.log("we win")
}

const onFailure = function(response) {
  console.log(response);
}

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Ever wonder what would be on your ultimate spotify playlist?
          </p>
          <SpotifyLogin clientId={clientId}
            redirectUri={'https://lbakke.github.io/listomania'}
            onSuccess={onSuccess}
            onFailure={onFailure}/>
          <Button variant="contained"><Link to="/listomania/about">More Info</Link></Button>
        </header>
      </div>
    );
  }
}