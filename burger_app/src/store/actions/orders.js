import * as actionTypes from './actionTypes'
import axios from '../../axios'

////////////////////////////////////////////////////
///               fetchOrders                    ///
////////////////////////////////////////////////////
export const fetchOrdersSuccess = (orders) => {  ///
    return {                                     ///
        type: actionTypes.FETCH_ORDERS_SUCCESS,  ///
        orders: orders                           ///
    }                                            ///
};                                               ///
export const fetchOrdersFail = () => {           ///
    return {                                     ///
        type: actionTypes.FETCH_ORDERS_FAIL      ///
    }                                            ///
};                                               ///
export const fetchOrdersStart = () => {          ///
    return {                                     ///
        type: actionTypes.FETCH_ORDERS_START     ///
    }                                            ///
};                                               ///
////////////////////////////////////////////////////

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('orders.json' + queryParams).then(response => {
            const getOrders = [];
            for (let key in response.data) {
                getOrders.push({...response.data[key], id: key})
            }
            dispatch(fetchOrdersSuccess(getOrders));
        }).catch(error => {
            dispatch(fetchOrdersFail(error))
        })
    }
};
