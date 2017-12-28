import React from 'react';
import './Backdrop.css'

const component = (props) => (
    props.show ? <div className="Backdrop" onClick={props.hide}> </div> : null
);

export default component;
