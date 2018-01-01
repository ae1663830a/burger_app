import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 1
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.3,
    meat: 1.2,
    bacon: 0.8
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + action.value
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + action.value
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        default:
            return state;
    }
};

export default reducer;
