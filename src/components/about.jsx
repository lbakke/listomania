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
                  <p><h1>Listomania</h1>...is about playing with playlists! this app will search through your playlists and create one with the qualities you 
                    want - danceability, etc! it will create the playlist for you and name it [username]-dance, [username]-energy, 
                    etc! so get ready to see your playlists taken to the next level!
                  </p>
                  <Button variant="contained"><Link to="/listomania/">Go Back</Link></Button>
              </div>
          </div>
      </div>
    )
  }
}
