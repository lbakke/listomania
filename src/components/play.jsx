import React, { Component, useEffect, useState } from 'react'
import '../App.css'; 
import { SpotifyApiContext, User, UserTop, UserPlaylists, Playlist, PlaylistTracks, TrackFeatures } from 'react-spotify-api'

import { SpotifyAuth, Scopes } from 'react-spotify-auth'
// import 'react-spotify-auth/dist/index.css'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn } from "mdbreact";
import Cookies from 'js-cookie'
import Navbar from './navbar.jsx'

var myTracks = []; 
var bestTracks = []; 

const Play = () => {
  const [spotifyAuthToken, setSpotifyAuthToken] = useState()
  var displayTracks = false; 

  useEffect(() => {
    setSpotifyAuthToken(Cookies.get('spotifyAuthToken'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get('spotifyAuthToken')]);


  return (
    <div className='app'>
      <Navbar></Navbar>
      <SpotifyApiContext.Provider value={spotifyAuthToken}>
      <User>
                {(user) =>
                  user && user.data ? (
                    <>
                      
                              Welcome, {user.data.display_name}
                    </>
                  ) : (
                      <p>Loading...</p>
                    )
                }
              </User>
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
                            <PlaylistTracks id={playlist.id}>
                            {(tracks, loading, error) => (
                                tracks && tracks.data ? (
                                  tracks.data.items.map(track => {
                                    myTracks.push(track); 
                                    return(
                                      <>
                                      <p>trackid: {track.track.id}</p>
                                      <TrackFeatures id={track.track.id}>
                                      {(features) => 
                                        features && features.data ? (
                                          <>
                                          <p>featurers...?</p>
                                          <p>{features.data.danceability}</p> 
                                          </>
                                        ) : null
                                      }
                                    </TrackFeatures>
                                    <p key={track.track.id}>{track.track.name}</p>
                                    </>
                                  )})) : null 
                            )}
                          </PlaylistTracks>
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