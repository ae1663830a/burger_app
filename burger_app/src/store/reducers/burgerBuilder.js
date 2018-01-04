import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 1,
    error: false,
    builtBurger: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.3,
    meat: 1.2,
    bacon: 0.8
};

const changeIngredient = (state, action) => {
    return {
        ...state.ingredients,
        [action.ingredientName]: state.ingredients[action.ingredientName] + action.value
    };
};

const setIngredients = (state, action) => {
    return {
        ...state,
        // ingredients: action.ingredients, // Better way, gives flexibility
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        error: false,
        builtBurger: false
    }
};

const burgerBuilderReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state, ingredients: changeIngredient(state, action),
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                builtBurger: true
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state, ingredients: changeIngredient(state, action),
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                builtBurger: true
            };
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action);
        case actionTypes.SET_PRICE:
            return {...state, totalPrice: action.totalPrice, error: false, builtBurger: false};
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {...state, error: true};
        default:
            return state;
    }
};

export default burgerBuilderReducer;
