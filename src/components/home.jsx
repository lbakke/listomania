import React, { useEffect, useState } from 'react'
import { SpotifyApiContext, User, UserTop } from 'react-spotify-api'
import Cookies from 'js-cookie'

import { SpotifyAuth, Scopes } from 'react-spotify-auth'

import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn } from "mdbreact";
import 'mdbreact/dist/css/mdb.css'

import '../index.css';
import TrackCard from "./trackcard";
import logo from '../listomania-logo.png';
// import Button from '@material-ui/core/Button';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Button } from 'antd';




const dev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const App = () => {
  const [spotifyAuthToken, setSpotifyAuthToken] = useState()

  useEffect(() => {
    setSpotifyAuthToken(Cookies.get('spotifyAuthToken'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get('spotifyAuthToken')])

  const logout = () => {
    Cookies.remove('spotifyAuthToken', { path: dev ? '' : 'react-spotify-auth' })
    window.location = dev ? '/' : '/react-spotify-auth'
  }

  return (
    <div className='app'>
      <MDBContainer>
        {/* If there is a cookie named 'spotifyAuthToken' */}
        {Cookies.get('spotifyAuthToken') ? (
          // Display the app
          <>
            <SpotifyApiContext.Provider value={spotifyAuthToken}>
              <User>
                {(user) =>
                  user && user.data ? (
                    <>
                      <h1>Hello, {user.data.display_name} !</h1>
                    </>
                  ) : (
                      <p>Loading...</p>
                    )
                }
              </User>
              <h2>select one of the following buttons to create a playlist with your favorite songs in that category! the app will 
                scrape your public playlists and put one together that's perfect for whatever mood you're feeling! 
              </h2>
              <h2>your latest top tracks...</h2>
              <MDBRow className="masonry-with-columns">
                <UserTop type="tracks">
                  {(tracks, loading, error) =>
                    tracks && tracks.data ? (
                      tracks.data.items.map((track, ind) => {
                        return (
                          <>
                            <TrackCard
                              track={track} />
                          </>
                        )
                      })
                    ) : null
                  }
                </UserTop>
              </MDBRow>
            </SpotifyApiContext.Provider>
            <MDBBtn onClick={logout}>
              Logout
            </MDBBtn>
          </>
        ) : (
            <div>
          <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Ever wonder what would be on your ultimate spotify playlist?
          </p>
          <div className="spotifyBtn">
                <SpotifyAuth
                  redirectUri={dev ? 'http://localhost:3000/listomania' : 'http://lbakke.github.io/listomania'}
                  clientID='8db0e36af4d14373a26ba100f16b2ad3'
                  scopes={[Scopes.userReadPrivate, Scopes.userReadEmail, "user-top-read"]}
                />
              </div>
          <Button variant="contained"><Link to="/listomania/about">More Info</Link></Button>
          </header>
            </div>
          )}
      </MDBContainer>
    </div>
  )
}

export default App