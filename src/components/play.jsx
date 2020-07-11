import React, { Component, useEffect, useState } from 'react'
import '../App.css'; 
import { SpotifyApiContext, User, UserTop } from 'react-spotify-api'

import { SpotifyAuth, Scopes } from 'react-spotify-auth'
// import 'react-spotify-auth/dist/index.css'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn } from "mdbreact";
import Cookies from 'js-cookie'


const Play = () => {
  const [spotifyAuthToken, setSpotifyAuthToken] = useState()

  useEffect(() => {
    setSpotifyAuthToken(Cookies.get('spotifyAuthToken'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get('spotifyAuthToken')])
  return (
    <div className='app'>
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
            </SpotifyApiContext.Provider>
    </div>
  )
}

export default Play;

// export default class Play extends Component {
//     render() {
//       return (
//         <div>
//           play component
//           nothing ishere ?
//         </div>
//       )
//     }
// }