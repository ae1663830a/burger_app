import React from 'react';
import './BuildControl.css'

const buildControl = (props) => {
    return (
        <div className="BuildControl">
            <div className="Label">{props.label}</div>
            <button className="Less" onClick={props.deduct} disabled={props.disabled}>Less</button>
            <button className="More" onClick={props.add}>More</button>
        </div>
    )
};

export default buildControl;
