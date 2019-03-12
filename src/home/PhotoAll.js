import React, { Component } from 'react';
import toTitleCase from '../utilities/toTitleCase';
import cleanLocation from '../utilities/cleanLocation';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import './PhotoAll.css';

class PhotoAll extends Component {

    render() {

        const self = this;

        const photoUrlBase = process.env.REACT_APP_API_URL + '/';

        return this.props.photos.map((item, index) => {

            const thisHydrant = self.props.hydrants.find(function (testHydrant) {
                return testHydrant.hydrantId === item.hydrant_id;
            });

            const dateOptions = {
                timeZone: 'America/New_York',
                hour12: true,
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };

            const thisDate = new Date(item.upload_date);
            const thisUploadDate = thisDate.toLocaleString('en-US', dateOptions);
            const thisUploadTime = thisDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

            return (
                <Card className={'hydrant-card'} key={item._id}>
                    <CardSection>
                        <h3 id={'card-title-' + index}>{thisHydrant.street}</h3>
                        <h4><span id={'upload-date-span-' + index}>{thisUploadDate}</span></h4>
                        <h5><span id={'upload-time-span-' + index}>{thisUploadTime}</span></h5>
                    </CardSection>
                    <img src={photoUrlBase + item.img_url} alt={thisHydrant.streetName + ' ' + thisHydrant.suffix} />

                    <CardSection className="hydrant-info">
                        <a id="hydrant-link" className="button tiny float-right hydrant-link" href="#">All Photos of This Hydrant</a>
                        <p>
                            <strong>Hydrant ID:</strong>&nbsp;<span id="hydrant-id">{thisHydrant.hydrantId}</span></p>

                        <p>
                            <strong>Location:</strong>&nbsp;<br />
                            <span id="hydrant-street">{toTitleCase(thisHydrant.street)}</span>&nbsp;
                            <span id="loc-description">{cleanLocation(thisHydrant.locationDescription)}</span><br />
                            <span id="hydrant-city">{thisHydrant.city}</span>
                        </p>
                    </CardSection>
                </Card>
            )
        });
    }
}

export default PhotoAll;