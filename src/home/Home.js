import React, { Component } from 'react';
import PhotoCards from './PhotoCard'

class Home extends Component {
    render () {
        return ( () => {
            if ( this.props.hydrantData.isLoaded === true && this.props.photoData.isLoaded === true ) {
                return <PhotoCards photos={ this.props.photoData.items } hydrants={ this.props.hydrantData.items } />
            }else{
                return (
                    <h3>Loading...</h3>
                )
            }
        } )()
    }

}

export default Home;