import React, { Component } from 'react';
import ClosestMap from './ClosestMap';

class ClosestMapContainer extends Component {

    render() {

        const closestHydrantMapContainer = (() => {
            const { error, isLoaded, data } = this.props.closestHydrant;
            const thisLocationIsLoaded = this.props.thisLocation.isLoaded;
            if (error) {
                return <p>{error}</p>
            } else if (isLoaded === false || thisLocationIsLoaded === false) {
                return (
                    <div className="loader">Loading...</div>
                )
            } else {
                return (
                    <>
                        <ClosestMap
                            thisLocation={this.props.thisLocation}
                            closestHydrant={this.props.closestHydrant}
                        />
                        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
                    </>
                )
            }
        })();

        const thisLocationData = (() => {
            //const { lat, lon, isLoaded } = this.state.thisLocation;

            return (
                <>
                    <pre>{JSON.stringify(this.props.thisLocation, null, 2)}</pre>
                </>
            )

        })();

        const thisHydrantData = (() => {
            //const { lat, lon, isLoaded } = this.state.thisHydrantData;

            return (
                <>
                    <pre>{JSON.stringify(this.props.closestHydrant, null, 2)}</pre>
                </>
            )

        })();

        return (
            <>

                {closestHydrantMapContainer}
                {/* <h1>hello?</h1> */}
                {/* {thisLocationData}
                {thisHydrantData} */}

            </>
        )
    }
}

export default ClosestMapContainer