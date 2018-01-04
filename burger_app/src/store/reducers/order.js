import * as actionTypes from '../actions/actionTypes'

const initialState = {
    loading: false,
    purchased: false
};

const purchaseBurgerSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        purchased: true,
    }
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {...state, loading: false};
        case actionTypes.PURCHASE_INIT:
            return {...state, purchased: false};
        case actionTypes.PURCHASE_BURGER_START:
            return {...state, loading: true};
        default:
            return state;
    }
};

export default orderReducer;