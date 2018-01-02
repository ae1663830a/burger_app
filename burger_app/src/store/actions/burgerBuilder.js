import * as actionTypes from './actionTypes';
import axios from '../../axios'


export const addIngredient = (ingredient) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingredient,
        value: 1
    }
};

export const removeIngredient = (ingredient) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingredient,
        value: -1
    }
};
//////////////////////////////////////////////////////////
// Functions for initIngredients                       ///
//////////////////////////////////////////////////////////
export const setIngredients = (ingredients) => {       ///
    return {                                           ///
        type: actionTypes.SET_INGREDIENTS,             ///
        ingredients: ingredients                       ///
    }                                                  ///
};                                                     ///
export const setPrice = (price) => {                   ///
    return {                                           ///
        type: actionTypes.SET_PRICE,                   ///
        totalPrice: price                              ///
    }                                                  ///
};                                                     ///
export const fetchIngredientsFailed = () => {          ///
    return {                                           ///
        type: actionTypes.FETCH_INGREDIENTS_FAILED     ///
    }                                                  ///
};                                                     ///
//////////////////////////////////////////////////////////

export const initIngredients = () => {
    return dispatch => {
        axios.get('ingredients.json').then(response => {
            dispatch(setIngredients(response.data))
        }).catch(error => {
            dispatch(fetchIngredientsFailed())
        });
        axios.get('totalPrice.json').then(response => {
            dispatch(setPrice(response.data))
        }).catch(error => {
            dispatch(fetchIngredientsFailed())
        });
    }
};