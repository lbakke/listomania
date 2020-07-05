import React, { Component, useEffect, useState }from 'react'
import logo from '../listomania-logo.png';
import '../App.css';

import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import SpotifyWebApi from 'spotify-web-api-js';

import ReactDOM from 'react-dom';
import SpotifyLogin from 'react-spotify-login';
import { clientId, redirectUri } from './settings.jsx';

import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import { SpotifyApiContext, User, UserTop } from 'react-spotify-api'


import Cookies from 'js-cookie'
import 'react-spotify-auth/dist/index.css'

import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn } from "mdbreact";
import 'mdbreact/dist/css/mdb.css'
 
const onSuccess = function(response) {
  console.log(response);
  console.log("we win?");
}

const onFailure = function(response) {
  console.log(response);
}

const dev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';


const Home = () => {
  const [spotifyAuthToken, setSpotifyAuthToken] = useState()
  return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Ever wonder what would be on your ultimate spotify playlist?
          </p>
          <SpotifyLogin clientId={clientId}
            redirectUri={'https://lbakke.github.io/listomania'}
            onSuccess={onSuccess}
            onFailure={onFailure}/>
          <SpotifyAuth
            redirectUri='http://localhost:3000/play'
            clientID='clientId'
            scopes={[Scopes.userReadPrivate, "user-read-email"]} // either style will work
          />
          <Button variant="contained"><Link to="/listomania/about">More Info</Link></Button>
        </header> */}
              <MDBContainer>
        {/* If there is a cookie named 'spotifyAuthToken' */}
        {Cookies.get('spotifyAuthToken') ? (
          // Display the app
          <>
            <MDBRow>
              <h1>Hi! How's it going?</h1>
            </MDBRow>

            <SpotifyApiContext.Provider value={spotifyAuthToken}>
              <User>
                {(user) =>
                  user && user.data ? (
                    <>
                      <MDBCol style={{ maxWidth: '22rem', padding: '0 0 1rem 1rem' }}>
                        <MDBCard>
                          <MDBCardImage
                            className='img-fluid'
                            alt='Your Spotify Profile Picture'
                            waves
                          />
                          <MDBCardBody style={{ padding: '1rem' }}>
                            <MDBCardTitle>
                              Welcome, {user.data.display_name}
                            </MDBCardTitle>
                            <MDBCardText>
                              Here's some of your top tracks, as listed by Spotify.
                              </MDBCardText>
                          </MDBCardBody>
                        </MDBCard>
                      </MDBCol>
                    </>
                  ) : (
                      <p>Loading...</p>
                    )
                }
              </User>

              <MDBRow className="masonry-with-columns">
                <UserTop type="tracks">
                  {(tracks, loading, error) =>
                    tracks && tracks.data ? (
                      tracks.data.items.map((track, ind) => {
                        return (
                          <> track here?
                          </>
                        )
                      })
                    ) : null
                  }
                </UserTop>
              </MDBRow>
            </SpotifyApiContext.Provider>
          </>
        ) : (
            <div className="login-page">
              <h1>React Spotify Auth Demo</h1>
              <h2>Sign in to get started</h2>
              {/*  Display the login page */}

              <div className="spotifyBtn">
                <SpotifyAuth
                  redirectUri={dev ? 'http://localhost:3000/callback' : 'http://kevinjiang.ca/react-spotify-auth'}
                  clientID='1a70ba777fec4ffd9633c0c418bdcf39'
                  scopes={[Scopes.userReadPrivate, Scopes.userReadEmail, "user-top-read"]}
                />
              </div>
            </div>
          )}
      </MDBContainer>
      </div>
    );
}

export default Home