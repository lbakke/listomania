import React, { useEffect, useState } from 'react'
import { SpotifyApiContext, User, UserTop } from 'react-spotify-api'
import Cookies from 'js-cookie'

import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import { FaSpotify } from 'react-icons/fa'; 

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

const about = (
  <div>
    <p style={aboutStyle}>Listomania is a tool that</p>
    <p style={aboutStyle}>creates playlists based on</p>
    <p style={aboutStyle}>your mood. It uses the</p>
    <p style={aboutStyle}>playlists you already have</p>
    <p style={aboutStyle}>to ensure they are full of</p>
    <p>songs you love!</p>
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
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" src={track.album.images[0].url} />}
                              >
                                <Meta title="Europe Street beat" description="www.instagram.com" />
                            >

                            </Card>
                          </>
                        )
                      })
                    ) : null
                  }
                </UserTop>
              </MDBRow>
            </SpotifyApiContext.Provider>
            <MDBBtn>
            <Link to="listomania/play">Instagram</Link>
            </MDBBtn>
            <MDBBtn onClick={logout}>
              Logout
            </MDBBtn>
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
      </MDBContainer>
    </div>
  )
}

export default App