import React from 'react';
import Logo from '../../Logo/Logo'
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'
import './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux'

const sideDrawer = (props) => {

    let attachedClasses = "sideDrawer close";
    if (props.open) {
        attachedClasses = "sideDrawer open"
    }
    return (
        <Aux>
            <Backdrop show={props.open} hide={props.closed}/>
            <div className={attachedClasses}>
                <div className="logoSideDrawer">
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
    );
};


export default sideDrawer;
