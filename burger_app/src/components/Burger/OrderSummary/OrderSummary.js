import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux'
import './OrderSummary.css'


class OrderSummary extends Component {

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(ingredientKey => {
                return (
                    <li key={ingredientKey}>
                        <span style={{textTransform: 'capitalize'}}>{ingredientKey}</span>
                        : {this.props.ingredients[ingredientKey]}
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
                <h2>{this.props.price.toFixed(2)} &euro;</h2>
                <p>Continue to checkout?</p>
                <button className="Button Danger" onClick={this.props.orderCancel}>Cancel</button>
                <button className="Button Success" onClick={this.props.orderContinue}>Continue</button>
            </Aux>
        );
    }
}

export default OrderSummary;
