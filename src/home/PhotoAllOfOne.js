import React, { Component } from 'react';
import toTitleCase from '../utilities/toTitleCase';
import cleanLocation from '../utilities/cleanLocation';
import cleanDate from '../utilities/cleanDate';
import cleanTime from '../utilities/cleanTime';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import $ from 'jquery';
import './PhotoAll.css';

const allByIdTemplate = (photo) => {

}

class PhotoAllOfOne extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hydrantId: this.props.hydrantId,
            street: '',
            locationDescription: '',
            city: '',
            photos: []
        };
    }

    handleCloseAllById = () => {
        this.props.handleCloseAllById();
    }

    componentDidMount() {
        const self = this;

        $.get('//' + process.env.REACT_APP_API_URL + '/api/hydrants/' + this.state.hydrantId, function (hydrantData) {
            const thisHydrant = hydrantData[0];
            self.setState(prevState => ({
                ...prevState,
                street: thisHydrant.street,
                locationDescription: thisHydrant.locationDescription,
                city: thisHydrant.city
            }));
        }).then(function () {
            $.get('//' + process.env.REACT_APP_API_URL + '/api/photos/' + self.state.hydrantId, function (photoData) {
                let thesePhotos = [];
                for (let i = 0; i < photoData.length; i++) {
                    let datum = photoData[i];

                    if (
                        datum.img_url.indexOf('undefined') < 0 &&
                        datum.hydrant_id.indexOf('undefined') < 0 &&
                        datum.img_loc_lat.indexOf('undefined') < 0
                    ) {
                        thesePhotos.push(datum);
                    } else {
                        thesePhotos.push('Nothing here boss');
                    }
                }
                self.setState(prevState => ({
                    ...prevState,
                    photos: thesePhotos
                }));

            })
        });
    }

    render() {

        const photoUrlBase = process.env.REACT_APP_API_URL + '/';

        const thesePhotos = () => {
            return this.state.photos.map((item, index) => {

                return (
                    <Card className={'hydrant-card'} key={item._id}>
                        <CardSection>
                            <h4><span id="upload-date-span">{cleanDate(item.upload_date)}</span></h4>
                            <h5><span id="upload-time-span">{cleanTime(item.upload_date)}</span></h5>
                        </CardSection>
                        <img src={photoUrlBase + item.img_url} />
                    </Card>
                )
            });
        }

        return (
            <>
                <div id={'all-by-id'} className={'grid-x'}>
                    <div className={'cell small-12'}>
                        <div className={'hydrant-card'}>
                            <h3>{this.state.street}</h3>
                            <p>
                                <a><strong>Hydrant ID:</strong>&nbsp;<span id="hydrant-id">{this.state.hydrantId}</span></a>
                            </p>
                            <p>
                                <strong>Location:</strong>&nbsp;<br />
                                <span id="hydrant-street">{toTitleCase(this.state.street)}</span><br />
                                <span id="description">{cleanLocation(this.state.locationDescription)}</span><br />
                                <span id="city">{toTitleCase(this.state.city)}</span>
                            </p>
                            <div className={'all-by-id-cards-wrapper'}>
                                {thesePhotos()}
                            </div>
                        </div>
                    </div>

                    <button className="button float-center" onClick={this.handleCloseAllById}>Close</button>

                </div>
            </>

        )
    }
}

export default PhotoAllOfOne;