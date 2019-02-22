import React from 'react';
import toTitleCase from '../utilities/toTitleCase';
import cleanLocation from '../utilities/cleanLocation';
import './ClosestHydrantInfo.css'
import CardSection from '../components/CardSection'

const ClosestHydrantInfo = (props) => {
    console.log(props.hydrantData.items)
    const thisHydrant = props.hydrantData.items.find((element) => {
        return element.hydrantId === props.closestHydrant.data.hydrantId
    });

    return (
        <CardSection>
            <div id={'hydrant-location-info'}>
                <dl>
                    <dt>Hydrant ID</dt>
                    <dd id={'hydrant-id'}>{props.closestHydrant.data.hydrantId}</dd>
                    <dt>Street</dt>
                    <dd>{toTitleCase(thisHydrant.streetName) + ' ' + toTitleCase(thisHydrant.suffix)}</dd>
                    <dt>Location Description</dt>
                    <dd>{cleanLocation(thisHydrant.locationDescription)}</dd>
                    <dt>Hydrant Location</dt>
                    <dd>{thisHydrant.location.lat + ', ' + thisHydrant.location.lon}</dd>
                    <dt>My Location</dt>
                    <dd>{props.thisLocation.lat + ', ' + props.thisLocation.lon}</dd>
                </dl>
            </div>
        </CardSection>
    )

}

export default ClosestHydrantInfo;