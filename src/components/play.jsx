import React, { Component } from 'react'
import '../App.css'; 
import { SpotifyApiContext, Artist } from 'react-spotify-api';

import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn } from "mdbreact";


export default class Play extends Component {
    render() {
      return (
        <div>
          play component
        </div>
      )
    }
}