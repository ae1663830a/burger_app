import React from 'react';
import burger from '../../assets/images/burger-logo.png'
import './Logo.css'

const logo = () => (
    <div className="logo">
        <img src={burger} alt="burger_logo" title="burger_logo"/>
    </div>
);

export default logo;
