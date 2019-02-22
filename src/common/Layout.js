import React, { Component } from 'react';
import NavigationHeader from './NavigationHeader'

class Layout extends Component {

    render() {

        return (
            <>
                <NavigationHeader />
                    <div className="grid-x">
                        <div className="cell small-12 medium-8 medium-offset-2 large-4 large-offset-4">
                            {this.props.children}
                        </div>
                    </div>
            </>
        );
    }
}

export default Layout;