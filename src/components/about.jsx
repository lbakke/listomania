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
                  <p>Here's a fun fact. I use spotify more than any app on my iphone by a long shot. But, sometimes I just feel
                  like Spotify could do more with the data they've collected on a user. Here's where listomania comes in. Just like
                  the craze with Lizst created Lizstomania back in the day, my app is replicating that frenzy by creating the 
                  ultimate playlist for users based on their top songs and artists.</p>
                  <p>No worries about the login/password, I can't steal your data because spotify would never even let me 
                      if I wanted to. They created the login page so all it's doing is authenticating you so that I can give you
                      your Ultimate Playlist. Cheers music nerds!!
                  </p>
                  <Button variant="contained"><Link to="/listomania/">Go Back</Link></Button>
              </div>
          </div>
      </div>
    )
  }
}
