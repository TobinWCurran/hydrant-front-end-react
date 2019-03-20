import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../home/Home';
import HydrantTable from '../hydrant-table/HydrantTable';
import ClosestHydrant from '../hydrant-map/ClosestHydrant';

function Main(props) {
    //let self = this;
    return (
        <main className={'grid-x grid-margin-x'}>
            <div className="cell small-12 medium-8 medium-offset-2 large-4 large-offset-4">
                <Switch>
                    <Route exact path='/' render={routerProps => <Home {...routerProps} hydrantData={props.hydrantData} photoData={props.photoData} />} />
                    <Route path='/hydrant-table' component={HydrantTable} />
                    <Route path='/closest-hydrant' render={routerProps => <ClosestHydrant {...routerProps} hydrantData={props.hydrantData} photoData={props.photoData} />} />
                </Switch>
            </div>
        </main>
    );
}
export default Main