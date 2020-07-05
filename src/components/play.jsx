import React, { Component } from 'react'
import '../App.css'; 
import { SpotifyApiContext, Artist } from 'react-spotify-api';

export default class Play extends Component {
    render() {
      return (
        <div>
          play component
          <SpotifyApiContext.Provider value={'BQAbnua41wG_f9Ll5a0qGJgjGblkq1u6mvc1MzFR3lmhPSU2F29yl7NMUlvJGEDS5p0oOEeSBUdEKA2IL5sSu7b9oQ0UtfyqtWpn3w6-DNG3Ywps30DSuTsDXRGjcCDC4C5XBKw8jiX2FMLFwpVzx-Fa'}>
          <Artist id={'4yvcSjfu4PC0CYQyLy4wSq'}>
                {({ data, loading, error }) =>
                data ? (
                    <div>
                    <h1>{data.name}</h1>
                    <ul>
                        {data.genres.map(genre => (
                        <li key={genre}>{genre}</li>
                        ))}
                    </ul>
                    </div>
                ) : null
                }
            </Artist>
          </SpotifyApiContext.Provider>
        </div>
      )
    }
}