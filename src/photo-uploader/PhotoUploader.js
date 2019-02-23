import React, { Component } from 'react';
import PhotoUploaderInput from './PhotoUploaderInput';
import loadImage from 'blueimp-load-image';
import $ from 'jquery';

class PhotoUploader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photo: {
                file: null,
                lat: props.thisLocation.lat,
                lon: props.thisLocation.lon,
                isLoaded: false
            },
            hydrant: {
                id: props.closestHydrant.data.hydrantId,
                lat: props.closestHydrant.data.lat,
                lon: props.closestHydrant.data.lon,
                isLoaded: true
            }
        };
    }

    handleOnChange = (event) => {
        //(setState(updater, callback))
        const self = this;
        const options = {
            //maxWidth: result.width(),
            canvas: false,
            //pixelRatio: window.devicePixelRatio,
            //downsamplingRatio: 0.5,
            orientation: true,
            maxWidth: 1200
        }
        const thisPhoto = event.target.files[0];
        //console.log('thisPhoto: ', thisPhoto)
        
        loadImage(
            thisPhoto,
            function (img) {
                img.toBlob(function (blob) {
                    self.setState( (prevState) => ({
                        ...prevState,
                        photo: {
                            ...prevState.photo,
                            file: URL.createObjectURL(blob),
                            isLoaded: true
                        }
                    }));
                }, 'image/jpeg');
            },
            options // Options
        );
    }

    testHandleFileUploadSubmit = () => {
        console.log(this.state)
        const formDataObject = {
            hydrantId: this.state.hydrant.id,
            imgLat: this.state.photo.lat,
            imglon: this.state.photo.lon,
            hydrantLat: this.state.hydrant.lat,
            hydrantLon: this.state.hydrant.lon,
            file: this.state.photo.file
        }
        console.log('formDataObject: ', formDataObject);
    }

    handleFileUploadSubmit = () => {

        const formData = new FormData();
        const formDataObject = {
            hydrantId: this.state.hydrant.id,
            imgLat: this.state.photo.lat,
            imglon: this.state.photo.lon,
            hydrantLat: this.state.hydrant.lat,
            hydrantLon: this.state.hydrant.lon,
            file: this.state.photo.file
        }
        for(let key in formDataObject){
            formData.append(key, formDataObject[key]);
        }

        $.ajax({
            type: "POST",
            url: process.env.REACT_APP_API_URL + '/api/photos',
    
            // The key needs to match your method's input parameter (case-sensitive).
            data: formData,
            contentType: false, //'multipart/form-data',
            dataType: false,
            cache: false,
            processData: false,
            success: function (data) {
                // alert(data.success); 
                // $('#upload-modal').foundation('close');
                // $('#upload-response').empty().prepend(data.success);
                // $('#upload-response-modal').foundation('open');
            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    }

    showPhoto = () => {
        if (this.state.photo.file !== null){
            return <img src={this.state.photo.file} alt="test" />
        }
    }

    componentDidUpdate(){
        if(this.state.photo.file !== null){
            this.testHandleFileUploadSubmit();
        }
    }

    render() {
        return (
            <>
                <PhotoUploaderInput onChange={this.handleOnChange} />
                {/* {this.showPhoto()}
                <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
            </>
        )
    }

}

export default PhotoUploader;