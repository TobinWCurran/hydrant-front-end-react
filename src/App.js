import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';
import Layout from './common/Layout';
import Main from './common/Main';
import NavigationHeader from './common/NavigationHeader';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hydrants: {
                error: null,
                isLoaded: false,
                items: []
            },
            photos: {
                error: null,
                isLoaded: false,
                items: []
            },
        };
    }

    whenReadySetState = (readyData) => {
        this.setState(readyData);
    }

    componentDidMount() {
        let self = this;

        this.getHydrantsAjax = $.get(process.env.REACT_APP_API_URL + '/api/hydrants')
            .done(function (response) {
                self.setState(prevState => ({
                    ...prevState,
                    hydrants: {
                        ...prevState.hydrants,
                        items: response
                    }
                }));
            })
            .fail(function (error) {
                self.setState(prevState => ({
                    ...prevState,
                    hydrants: {
                        ...prevState.hydrants,
                        error: error
                    }
                }));
            })
            .always(function () {
                self.setState(prevState => ({
                    ...prevState,
                    hydrants: {
                        ...prevState.hydrants,
                        isLoaded: true
                    }
                }));
            });

        this.getPhotosAjax = $.get(process.env.REACT_APP_API_URL + '/api/photos')
            .done(function (response) {
                self.setState(prevState => ({
                    ...prevState,
                    photos: {
                        ...prevState.photos,
                        items: response
                    }
                }));
            })
            .fail(function (error) {
                self.setState(prevState => ({
                    ...prevState,
                    photos: {
                        ...prevState.photos,
                        error: error
                    }
                }));
            })
            .always(function () {
                self.setState(prevState => ({
                    ...prevState,
                    photos: {
                        ...prevState.photos,
                        isLoaded: true
                    }
                }));
            });
    }

    componentWillUnmount() {
        this.getHydrantsAjax.abort();
        this.getPhotosAjax.abort();
    }

    render() {

        return (
            <div className="App">
                <Layout>
                    <Main hydrantData={this.state.hydrants} photoData={this.state.photos} />
                </Layout>
            </div>
        );
    }
}

export default App;