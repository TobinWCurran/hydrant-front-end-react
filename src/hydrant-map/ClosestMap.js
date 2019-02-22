import React, { Component } from 'react';
import { Map, TileLayer, FeatureGroup, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';
import hydrantIcon from './hydrantIcon';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const ModifiedMarker = (props) => {

    const initMarker = ref => {
      if (ref) {
        ref.leafletElement.openPopup()
      }
    }
  
    return <Marker ref={initMarker} {...props}/>
  }

class ClosestMap extends Component {

    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
      }
      
      componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
      }
      
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
      }
      
      updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      }

    render() {
        const mapStyle = ( () => {
            if(this.state.width < 640){
                return {
                    'width': '100%',
                    'height': '300px'
                }
            }else {
                return {
                    'width': '100%',
                    'height': '500px'
                }
            }
        })();


        let thisPosition;
        let hydrantPosition;
        let boundsOptions;
        let bounds;

        const thisMap = () => {
            if (this.props.closestHydrant.isLoaded === false && this.props.thisLocation.isLoaded === false){
                return <h1>Loading...</h1>
            }else{
                
                thisPosition = [this.props.thisLocation.lat, this.props.thisLocation.lon];
                hydrantPosition = [this.props.closestHydrant.data.lat, this.props.closestHydrant.data.lon];
                //console.log(cleanMidpoint);
                bounds = L.latLngBounds([thisPosition, hydrantPosition]);
                boundsOptions = {
                    'padding': [50, 50]
                }

                return (
                    <>
                        <Map
                            //center={cleanMidpoint}
                            //zoom={zoom}
                            style={mapStyle}
                            id={'mapid'}
                            bounds={bounds}
                            boundsOptions={boundsOptions}
                        >
                            <TileLayer
                                attriibution={'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'}
                                //attribution={'&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
                                url={`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`}
                                id={'mapbox.streets'}
                                maxZoom={25}
                            />
                            <FeatureGroup>
                                <ModifiedMarker position={thisPosition}>
                                    <Popup>
                                    My Location
                                    </Popup>
                                </ModifiedMarker>
                                <ModifiedMarker
                                    position={hydrantPosition}
                                    icon={hydrantIcon}
                                >
                                    <Popup>
                                    Hydrant Location
                                    </Popup>
                                </ModifiedMarker>
                            </FeatureGroup>
                        </Map>
                    </>
                )
                
            }
        }

        return (
            <>
                {thisMap()}
                {/* <pre>{JSON.stringify(this.props.closestHydrant, null, 2)}</pre>
                <pre>{JSON.stringify(this.props.thisLocation, null, 2)}</pre> */}
            </>
        )
    }

}

export default ClosestMap