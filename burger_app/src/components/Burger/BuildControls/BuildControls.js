import React from 'react';
import './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
    <div className="BuildControls">
        <h3>Burger price: {props.price.toFixed(2)} &euro;</h3>
        {controls.map(control => (
            <BuildControl
                key={control.label}
                label={control.label}
                add={() => props.addIngredient(control.type)}
                deduct={() => props.deductIngredient(control.type)}
                disabled={props.disabled[control.type]}
            />
        ))}
        <button className="OrderButton"
                disabled={!props.canBeOrdered}
                onClick={props.order}>Order Now
        </button>
    </div>
);


export default buildControls;
