import React from 'react';
import { Link } from 'react-router-dom'

const NavigationItems = () => (
    <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/hydrant-table'>Hydrants Table</Link></li>
        <li><Link to='/closest-hydrant'>Find Closest Hydrant</Link></li>
    </>
)
export default NavigationItems;