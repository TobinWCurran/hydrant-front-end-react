
import $ from 'jquery';

const GetHydrantData = function GetHydrantDataFromAPI(props) {

    $.get(process.env.REACT_APP_API_URL + '/api/hydrants', function () {

    }).done(function (response) {

        props.whenReadySetState(prevState => ({
            ...prevState,
            hydrants: {
                ...prevState.hydrants,
                items: response
            }
        }));
    }).fail(function (error) {
        props.whenReadySetState(prevState => ({
            ...prevState,
            hydrants: {
                ...prevState.hydrants,
                error: error
            }
        }));
    }).always(function () {
        props.whenReadySetState(prevState => ({
            ...prevState,
            hydrants: {
                ...prevState.hydrants,
                isLoaded: true
            }
        }));
    });
}

export default GetHydrantData;
