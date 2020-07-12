import React, { Component, useEffect, useState } from 'react'
import '../App.css'; 
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Cookies from 'js-cookie'
import { SpotifyApiContext, User, UserTop } from 'react-spotify-api'



// export default class Navbar extends Component {
//   render() {
//     return (
//       <div>
//         <div className="navbar">
//           <h1 className="navbar-logo">Listomania</h1>
//           <h2 className="navbar-user">Hello, user!</h2>
//         </div>
//       </div>
//     )
//   }
// }



const Navbar = () => {
    const [spotifyAuthToken, setSpotifyAuthToken] = useState()
  
    useEffect(() => {
      setSpotifyAuthToken(Cookies.get('spotifyAuthToken'))
    }, [Cookies.get('spotifyAuthToken')])
    return (
      <div className='navbar'>
        <h1 className="navbar-logo">Listomania</h1>
        <SpotifyApiContext.Provider value={spotifyAuthToken}>
                <User>
                  {(user) =>
                    user && user.data ? (
                      <>
                        <h2 className="navbar-user">Hello, {user.data.display_name}!</h2>
                      </>
                    ) : (
                        <h2 className="navbar-user">...!</h2>
                      )
                  }
                </User>
              </SpotifyApiContext.Provider>
      </div>
    )
  }

  export default Navbar;