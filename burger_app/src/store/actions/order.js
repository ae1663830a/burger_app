import * as actionTypes from './actionTypes'
import axios from '../../axios'

/////////////////////////////////////////////////////////////
// purchaseBurger                                         ///
/////////////////////////////////////////////////////////////
export const purchaseBurgerSuccess = (id, orderData) => { ///
    return {                                              ///
        type: actionTypes.PURCHASE_BURGER_SUCCESS,        ///
        orderId: id,                                      ///
        orderData: orderData                              ///
    }                                                     ///
};                                                        ///
export const purchaseBurgerFail = error => {              ///
    return {                                              ///
        type: actionTypes.PURCHASE_BURGER_FAIL,           ///
        error: error                                      ///
    }                                                     ///
};                                                        ///
export const purchaseBurgerStart = () => {                ///
    return {                                              ///
        type: actionTypes.PURCHASE_BURGER_START           ///
    }                                                     ///
};                                                        ///
/////////////////////////////////////////////////////////////

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(onError => {
                dispatch(purchaseBurgerFail(onError))
            });
    }
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
};