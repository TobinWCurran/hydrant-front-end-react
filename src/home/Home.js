import React, { Component } from 'react';
import PhotoAll from './PhotoAll';
import PhotoAllOfOne from './PhotoAllOfOne';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showAllOfOne: false,
            hydrantId: ''
        };
    }

    handleAllById = (event) => {
        let thisHydrant = event.target.value;
        this.setState(prevState => ({
            ...prevState,
            showAllOfOne: true,
            hydrantId: thisHydrant
        }));
    }

    handleCloseAllById = () => {
        this.setState(prevState => ({
            ...prevState,
            showAllOfOne: false,
            hydrantId: ''
        }));
    }

    render () {
        return ( () => {
        
            if ( this.props.hydrantData.isLoaded === true && this.props.photoData.isLoaded === true && this.state.showAllOfOne === false ) {
                return <PhotoAll photos={ this.props.photoData.items } hydrants={ this.props.hydrantData.items } handleAllById={this.handleAllById} />
            }else if(this.state.showAllOfOne === true){
                return <PhotoAllOfOne hydrantId={this.state.hydrantId} handleCloseAllById={this.handleCloseAllById}/>
            }else{
                return (
                    <h3>Loading...</h3>
                )
            }
        } )()
    }

}

export default Home;