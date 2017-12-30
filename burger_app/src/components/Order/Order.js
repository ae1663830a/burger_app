import React from 'react';
import './Order.css'

const order = (props) => {
    const ingredients = [];

    for (let ingredient in props.ingredients) {
        ingredients.push({
            name: ingredient,
            amount: props.ingredients[ingredient]
        })
    }

    const ingredientOutput = ingredients.map(ingredient => {
        return (
            <span className='oneOrder' key={ingredient.name}>
                {ingredient.name}: <strong><u>{ingredient.amount}</u></strong>
            </span>
        )
    });

    return (
        <div className='order'>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>{props.price} &euro;</strong></p>
        </div>
    );
};

export default order;
