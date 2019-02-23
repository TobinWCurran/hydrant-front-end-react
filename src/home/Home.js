import React, { Component } from 'react';
import PhotoAll from './PhotoAll'

class Home extends Component {
    render () {
        return ( () => {
            if ( this.props.hydrantData.isLoaded === true && this.props.photoData.isLoaded === true ) {
                return <PhotoAll photos={ this.props.photoData.items } hydrants={ this.props.hydrantData.items } />
            }else{
                return (
                    <h3>Loading...</h3>
                )
            }
        } )()
    }

}

export default Home;