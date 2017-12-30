import React from 'react';
import Burger from '../../Burger/Burger'
import '../../Burger/OrderSummary/OrderSummary.css'
import './CheckoutSummary.css'

const checkoutSummary = (props) => {
    return (
        <div className="checkoutSummary">
            <h1>We hope it is delicious</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <button className="Button Danger" onClick={props.orderCancel}>Cancel</button>
            <button className="Button Success" onClick={props.orderContinue}>Continue</button>
        </div>
    );
};


export default checkoutSummary;
