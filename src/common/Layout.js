import React, { Component } from 'react';
import NavigationHeader from './NavigationHeader'

class Layout extends Component {

    render() {

        return (
            <>
                <NavigationHeader />
                {this.props.children}
            </>
        );
    }
}

export default Layout;