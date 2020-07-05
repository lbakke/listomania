import React, { Component } from 'react'
import '../App.css'; 
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import Button from '@material-ui/core/Button';



export default class About extends Component {
  render() {
    return (
      <div>
          <div className="more-info-page">
              <div className="more-info-box">
                  <p>Create a playlist with your all-time favorite songs. music nerds rise up!!1!
                  </p>
                  <Button variant="contained"><Link to="/listomania/">Go Back</Link></Button>
              </div>
          </div>
      </div>
    )
  }
}
