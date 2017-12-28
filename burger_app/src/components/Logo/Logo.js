import React from 'react';
import burger from '../../assets/images/127 burger-logo.png'
import './Logo.css'

const logo = (props) => (
    <div className="logo">
        <img src={burger} alt="burger_logo" title="burger_logo"/>
    </div>
);

export default logo;
