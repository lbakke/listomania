import React, { Component, useEffect, useState } from 'react'
import '../App.css'; 
import { SpotifyApiContext, User, UserTop, UserPlaylists, Playlist, PlaylistTracks } from 'react-spotify-api'

import { SpotifyAuth, Scopes } from 'react-spotify-auth'
// import 'react-spotify-auth/dist/index.css'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn } from "mdbreact";
import Cookies from 'js-cookie'
import Navbar from './navbar.jsx'

var myPlaylists = []; 

const Play = () => {
  const [spotifyAuthToken, setSpotifyAuthToken] = useState()

  useEffect(() => {
    setSpotifyAuthToken(Cookies.get('spotifyAuthToken'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get('spotifyAuthToken')])
  return (
    <div className='app'>
      <Navbar></Navbar>
      <SpotifyApiContext.Provider value={spotifyAuthToken}>
      <User>
                {(user) =>
                  user && user.data ? (
                    <>
                      
                              Welcome, {user.data.display_name}
                              <p>{spotifyAuthToken}</p>
                    </>
                  ) : (
                      <p>Loading...</p>
                    )
                }
              </User>
              {/* <PlaylistTracks id="060QHhmOlYMEfFdxl4NpAS">
                  {(tracks, loading, error) => (
                      tracks ? (
                          tracks.items.map(track => (
                              <h1 key={track.track.id}>{track.track.name}</h1>
                          ))
                      ) : null
                  )}
              </PlaylistTracks> */}
                <UserTop type="tracks">
                  {(tracks, loading, error) =>
                    tracks && tracks.data ? (
                      tracks.data.items.map((track, ind) => {
                        return (
                          <>
                            {track.album.name}
                          </>
                        )
                      })
                    ) : null
                  }
                </UserTop>
                <UserPlaylists>
                  {(playlists) =>
                    playlists && playlists.data ? (
                      playlists.data.items.map((playlist) => {
                        return (
                          <>
                            <Playlist id={playlist.id}>
                            {(playlist, loading, error) => (
                                playlist && playlist.data ? (
                                  <div>{playlist.data.name}, {playlist.data.owner.display_name}</div>) : null
                            )}
                          </Playlist>
                          </>
                        )
                      })
                    ) : null
                  }
                </UserPlaylists>
            </SpotifyApiContext.Provider>
    </div>
  )
}

export default Play;