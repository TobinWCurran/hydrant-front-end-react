import React, { Component } from 'react';
import toTitleCase from '../utilities/toTitleCase';
import cleanLocation from '../utilities/cleanLocation';
import './PhotoCard.css';

class PhotoCard extends Component {

    render() {

        let self = this;

        const photoUrlBase = process.env.REACT_APP_API_URL + '/';

        const cards = this.props.photos.map((item, index) => {

            const thisHydrant = self.props.hydrants.find(function(testHydrant){
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
                <div className="card hydrant-card" key={item._id}>
                    <div className="card-section">
                        <h3 id={'card-title-' + index}>{thisHydrant.streetName + ' ' + thisHydrant.suffix}</h3>
                        <h4><span id={'upload-date-span-' + index}>{thisUploadDate}</span></h4>
                        <h5><span id={'upload-time-span-' + index}>{thisUploadTime}</span></h5>
                    </div>
                    <img src={photoUrlBase + item.img_url} alt={thisHydrant.streetName + ' ' + thisHydrant.suffix}/>

                    <div className="card-section hydrant-info">
                        <a id="hydrant-link" className="button tiny float-right hydrant-link" href="#">All Photos of This Hydrant</a>
                        <p>
                            <strong>Hydrant ID:</strong>&nbsp;<span id="hydrant-id">{thisHydrant.hydrantId}</span></p>

                        <p>
                            <strong>Location:</strong>&nbsp;<br />
                            <span id="hydrant-street">{ toTitleCase(thisHydrant.streetName) }</span>&nbsp;
                            <span id="hydrant-street-suffix">{ toTitleCase(thisHydrant.suffix) }</span><br />
                            <span id="loc-description">{ cleanLocation(thisHydrant.locationDescription) }</span><br />
                            <span id="hydrant-city">{ thisHydrant.city }</span>
                        </p>
                    </div>
                </div>
            )
        });

        return cards;
    }
}

export default PhotoCard;