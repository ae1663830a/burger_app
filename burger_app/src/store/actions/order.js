import * as actionTypes from './actionTypes'
import axios from '../../axios'

/////////////////////////////////////////////////////////////
// purchaseBurger                                          ///
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
        type: actionTypes.FETCH_INGREDIENTS_FAILED,       ///
        error: error                                      ///
    }                                                     ///
};                                                        ///
/////////////////////////////////////////////////////////////

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log(response.data);
                dispatch(purchaseBurgerSuccess(response.data, orderData))
            })
            .catch(onError => {
                dispatch(purchaseBurgerFail(onError))
            });
    }
};

export const purchaseBurgerStart = () => {
  return {
      type: actionTypes.PURCHASE_BURGER_START
  }
};