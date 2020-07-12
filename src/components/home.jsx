import React, { useEffect, useState } from 'react'
import { SpotifyApiContext, User, UserTop } from 'react-spotify-api'
import Cookies from 'js-cookie'

import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import { FaSpotify } from 'react-icons/fa'; 
import Navbar from './navbar.jsx'

import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn } from "mdbreact";
// import 'mdbreact/dist/css/mdb.css'

import '../index.css';
import TrackCard from "./trackcard";
import logo from '../listomania-logo.png';
// import Button from '@material-ui/core/Button';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Typography, Space, Button, Card, Popover } from 'antd';
const { Meta } = Card;

const aboutStyle = {
  "margin-bottom": "-4px"
}

const button1 = {
  "background-color": "#8fffa7",
  "border-color": "black", 
  "color": "black"
}

const button2 = {
  "background-color": "#8ffffb",
  "border-color": "black", 
  "color": "black"
}

const button3 = {
  "background-color": "#ffd08f",
  "border-color": "black", 
  "color": "black"
}

const button4 = {
  "background-color": "#ff8fe3",
  "border-color": "black", 
  "color": "black"
}

const button5 = {
  "background-color": "#bb9cff",
  "border-color": "black", 
  "color": "black"
}

const about = (
  <div>
    <p style={aboutStyle}>Listomania is a tool that creates</p>
    <p style={aboutStyle}>playlists based on your mood. It uses</p>
    <p style={aboutStyle}>the playlists you already have to ensure</p>
    <p>they are full of songs you love!</p>
    <p style={aboutStyle}>This tool was created by Lauren Bakke: </p>
    <a href="https://lbakke.github.io" style={{"color": "blue"}}>lbakke.github.io</a>
  </div>
);

const dev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const App = () => {
  const [spotifyAuthToken, setSpotifyAuthToken] = useState()

  useEffect(() => {
    setSpotifyAuthToken(Cookies.get('spotifyAuthToken'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get('spotifyAuthToken')])

  const logout = () => {
    Cookies.remove('spotifyAuthToken', { path: dev ? '' : 'react-spotify-auth' })
    window.location = dev ? '/listomania' : '/react-spotify-auth'
  }

  return (
    <div className='app'>
        {/* If there is a cookie named 'spotifyAuthToken' */}
        {Cookies.get('spotifyAuthToken') ? (
          // Display the app
          <>
          <Navbar></Navbar>
            <div className="home-authenticated">
            <div className="home-header-authenticated">current mood?</div>
            <div className="home-buttons-holder">
              <Button className="home-button" style={button1} size="large" type="primary"><Link to="listomania/play">dance party</Link></Button>
              <Button className="home-button" style={button2} size="large"><Link to="listomania/play">happy thoughts</Link></Button>
              <Button className="home-button" style={button3} size="large"><Link to="listomania/play">sad boi hours</Link></Button>
              <Button className="home-button" style={button4} size="large"><Link to="listomania/play">big brain</Link></Button>
              <Button className="home-button" style={button5} size="large"><Link to="listomania/play">sentimental favs</Link></Button>
            </div>
            </div>
            <div className="home-other-buttons-holder">
              <Popover style={{"max-width": "200px"}} placement="bottom" title="What is this?" content={about} trigger="click">
                <Button className="home-button" size="large">What's Happening?</Button>
              </Popover>
              <Button className="home-button" size="large" onClick={logout}>                
                Logout
              </Button>
            </div>
          </>
        ) : (
            <div>
          <header className="App-header">
          <p className="home-header">Listomania</p>
          <div className="spotify-button">
            <FaSpotify color="#bfff00"></FaSpotify>
                <SpotifyAuth
                  redirectUri={dev ? 'http://localhost:3000/listomania' : 'http://lbakke.github.io/listomania'}
                  clientID='8db0e36af4d14373a26ba100f16b2ad3'
                  scopes={[Scopes.userReadPrivate, Scopes.userReadEmail, "user-top-read"]}
                  btnClassName="spotify-button"
                  noLogo='true'
                  title='Login with Spotify'
                />
              </div>
          <Popover style={{"max-width": "200px"}} placement="bottom" title="What is this?" content={about} trigger="click">
            <Button type="text">More Info</Button>
          </Popover>
          </header>
            </div>
          )}
    </div>
  )
}

export default App