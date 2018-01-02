import * as actionTypes from '../actions/actionTypes'

const initialState = {
    orders: [],
    loading: false
};

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {...state, orders: action.orders, loading: false};
        case actionTypes.FETCH_ORDERS_FAIL:
            return {...state, loading: false};
        case actionTypes.FETCH_ORDERS_START:
            return {...state, loading: true};
        default:
            return state;
    }
};

export default ordersReducer;
