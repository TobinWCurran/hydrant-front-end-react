import React, {Component} from 'react';
import ClosestMapContainer from './ClosestMapContainer';
import PhotoUploader from '../photo-uploader/PhotoUploader';
import $ from 'jquery';
import ClosestHydrantInfo from './ClosestHydrantInfo';
import Button from '../components/Button';
import Card from '../components/Card';
import CardSection from '../components/CardSection';

const buttonStyle = {
    'marginBottom': '1px'
}

class ClosestHydrant extends Component {

    constructor(props) {
        super(props);

        this.state = {
            closestHydrant: {
                error: null,
                data: {},
                isLoaded: false
            },
            thisLocation: {
                lat: null,
                lon: null,
                isLoaded: false
            },
            showMap: false
        };
    }

    getLocation = () => {
        const self = this;

        const options = {
            enableHighAccuracy: true,
            timeout: 50000,
            maximumAge: 0
        };

        const handleSuccess = function handleSuccessGetLocation(position) {
            self.setState( prevState => ({
                ...prevState,
                thisLocation: {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                    isLoaded: true
                }
            }), () => {
                self.getHydrantData();
            });
        }

        const handleError = function handleErrorGetLocation(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }
        if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
        if (self.thisLocation.isLoaded === true) {
            console.log('True!')
        }

    }

    getHydrantData = function getHydrantDataFromAjax(){
        const self = this;

        const locationData = {
            lat: self.state.thisLocation.lat,
            lon: self.state.thisLocation.lon,
        }

        self.ajaxClosestHydrant = $.ajax({
            url: process.env.REACT_APP_API_URL + '/api/closest-hydrant/',
            method: 'POST',
            data: JSON.stringify(locationData),
            contentType: "application/json"
        }).done(function (response) {
            self.setState(prevState => ({
                ...prevState,
                closestHydrant: {
                    ...prevState.closestHydrant,
                    data: response
                },
                showMap: true
            }));
        }).fail(function (error) {
            self.setState(prevState => ({
                ...prevState,
                closestHydrant: {
                    ...prevState.closestHydrant,
                    error: error
                }
            }));
        }).always(function () {
            self.setState(prevState => ({
                ...prevState,
                closestHydrant: {
                    ...prevState.closestHydrant,
                    isLoaded: true
                },
            }));
        });
    }

    componentWillUnmount() {
        this.ajaxClosestHydrant.abort();
    }

    render(){

        return (
            <>
                <div className="text-center">
                    <h1>Closest Hydrant</h1>
                    <h2 className="subheader"></h2>
                </div>
                <Card className={'map-card'}>
                    { this.state.showMap
                        ?   <ClosestMapContainer
                                hydrantData={this.props.hydrantData}
                                photoData={this.props.photoData} 
                                closestHydrant={this.state.closestHydrant} 
                                thisLocation={this.state.thisLocation} />
                        :   null
                    }
                    
                    <CardSection>
                        <div id="hydrant-location-info">
    
                        </div>
                        { this.state.closestHydrant.isLoaded 
                            ?   <ClosestHydrantInfo 
                                    closestHydrant={this.state.closestHydrant} 
                                    hydrantData={this.props.hydrantData} 
                                    thisLocation={this.state.thisLocation} />
                            :   null
                        }
                    </CardSection>
                    <CardSection className="button-group">
                        <button id="map-button" className="button" onClick={this.getLocation}>
                            Get Closest
                        </button>
                        { this.state.closestHydrant.isLoaded
                            ?   <button 
                                    id="upload-image-button"
                                    className="button float-right" 
                                    data-open="upload-modal" 
                                    style={buttonStyle} >
                                        Take Photo
                                </button>
                            :   null
                        }
                    </CardSection>
                    { this.state.closestHydrant.isLoaded
                        ?   <PhotoUploader  
                                closestHydrant={this.state.closestHydrant} 
                                thisLocation={this.state.thisLocation} /> 
                        :   null
                    }
                </Card>
            </>
        )
    }
    
}

export default ClosestHydrant