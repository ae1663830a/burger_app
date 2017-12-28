import React from 'react';
import Aux from '../../../hoc/Aux'
import './OrderSummary.css'

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map(ingredientKey => {
            return (
                <li key={ingredientKey}>
                <span style={{textTransform: 'capitalize'}}>{ingredientKey}</span>
                : {props.ingredients[ingredientKey]}
            </li>
            )
        });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <h3>Total price:</h3>
            <h2>{props.price.toFixed(2)} &euro;</h2>
            <p>Continue to checkout?</p>
            <button className="Button Danger" onClick={props.orderCancel}>Cancel</button>
            <button className="Button Success" onClick={props.orderContinue}>Continue</button>
        </Aux>
    )

};

export default orderSummary;
