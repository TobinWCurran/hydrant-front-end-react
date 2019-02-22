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
                id: props.closestHydrant.data.id,
                lat: props.closestHydrant.data.lat,
                lon: props.closestHydrant.data.lon,
                isLoaded: true
            }
        };
    }

    handleOnChange = (file) => {
        this.setState((prevState) => ({
            ...prevState,
            photo: {
                ...prevState.photo,
                file: file,
                isLoaded: true
            }
        }));
    }

    render() {
        return (
            <>
                <PhotoUploaderInput onChange={this.handleOnChange} />
                {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
            </>
        )
    }

}


//document.querySelector('.file-select').addEventListener('change', handleFileUploadChange);
//document.querySelector('.file-submit').addEventListener('click', handleFileUploadSubmit);

var selectedFile;
let formData = new FormData();

function handleFileUploadChange(e) {

    selectedFile = e.target.files[0];

    let options = {
        //maxWidth: result.width(),
        canvas: false,
        //pixelRatio: window.devicePixelRatio,
        //downsamplingRatio: 0.5,
        orientation: true,
        maxWidth: 1200
    }

    //formData = new FormData();

    loadImage(
        selectedFile,
        function (img) {
            $('#upload-preview').empty().append(img);
            img.toBlob(function (blob) {
                formData.append('hydrant', blob, 'upload.jpg');
            }, 'image/jpeg');
            $('.file-submit').show();
        },
        options // Options
    );


    //formData.append('hydrant', selectedFile);
    formData.append('hydrantId', $('#hydrant-id').text());
    formData.append('imgLat', $('#img-lat').val());
    formData.append('imgLon', $('#img-lon').val());
    formData.append('hydrantLat', $('#hydrant-lat').val());
    formData.append('hydrantLon', $('#hydrant-lon').val());

    //console.log('e.target', e.target);
    //console.log('selectedFile', selectedFile);
    //console.log("formData", formData);
}

function handleFileUploadSubmit(e) {

    //console.log("formData", formData.entries());

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
            //alert(data.success); 
            $('#upload-modal').foundation('close');
            $('#upload-response').empty().prepend(data.success);
            $('#upload-response-modal').foundation('open');
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

export default PhotoUploader;