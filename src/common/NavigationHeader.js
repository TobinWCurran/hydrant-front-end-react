import React, { Component } from 'react';
import $ from 'jquery';
import 'foundation-sites';
import NavigationItems from './NavigationItems'

class NavigationHeader extends Component {

    componentDidMount() {
        $(document).foundation();
        $(document).on("click", ".top-bar li", function () {
            $('.top-bar').css('display', 'none');
        });
    }

    render() {
        return (
            <>
                <div className="title-bar" data-responsive-toggle="main-menu" data-hide-for="medium">
                    <button className="menu-icon" type="button" data-toggle=""></button>
                    <div className="title-bar-title">Menu</div>
                </div>

                <div id="main-menu" className="top-bar">
                    <div className="top-bar-left">
                        <ul className="menu vertical medium-horizontal">
                            <li className="menu-text">Menu</li>
                            <NavigationItems />
                        </ul>
                    </div>
                </div>
            </>
        )
    }
}

export default NavigationHeader