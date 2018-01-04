import React from 'react';
import './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
    <ul className="navigationItems">
        <NavigationItem link="/" exact>Burger builder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
        {!props.isAuthenticated ?
            <NavigationItem link="/login">Login</NavigationItem> :
            <NavigationItem link="/logout">Logout</NavigationItem>
        }
    </ul>
);

export default navigationItems;
