import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import './Burger.css'

const burger = (props) => {
    const addedIngredients = Object.keys(props.ingredients) // Takes Object with different properties
        .map(ingredientKey => { // Takes individual Object's property
            return [...Array(props.ingredients[ingredientKey])] // Creates an array with length of properties value
                .map((_, index) => { // Underscore "_" means 'dont care what' variable or a 'placeholder'
                return <BurgerIngredient key={index + ingredientKey} type={ingredientKey}/> // BurgerIngredient with properties type
            })
        });

    return (
        <div className="Burger">

            <BurgerIngredient type="bread-top"/>
            {addedIngredients}
            <BurgerIngredient type="bread-bottom"/>

        </div>
    );
};

export default burger;
