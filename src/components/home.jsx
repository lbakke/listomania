import React, { useEffect, useState } from 'react'
import { SpotifyApiContext, User, UserTop } from 'react-spotify-api'
import Cookies from 'js-cookie'

import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css'

import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn } from "mdbreact";
import 'mdbreact/dist/css/mdb.css'

import '../index.css';
import TrackCard from "./trackcard";


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
        <p>this is always here..?</p>
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
                            src={user.data.images[0]}
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
            <div className="login-page">
              <h1>React Spotify Auth Demo</h1>
              <h2>Sign in to get started</h2>
              {/*  Display the login page */}

              <div className="spotifyBtn">
                <SpotifyAuth
                  redirectUri={dev ? 'http://localhost:3000/listomania' : 'http://lbakke.github.io/listomania'}
                  clientID='8db0e36af4d14373a26ba100f16b2ad3'
                  scopes={[Scopes.userReadPrivate, Scopes.userReadEmail, "user-top-read"]}
                />
              </div>
            </div>
          )}
      </MDBContainer>
    </div>
  )
}

export default App