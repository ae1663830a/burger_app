import React from 'react';
import './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavgationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = (props) => (
    <header className="toolbar">
        <DrawerToggle clicked={props.openMenu}/>
        <div className="logoToolbar">
            <Logo/>
        </div>
        <nav className="desktopOnly">
            <NavgationItems/>
        </nav>
    </header>
);

export default toolbar;
