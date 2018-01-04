import React, {Component} from 'react';
import Order from '../../components/Order/Order'
import axios from '../../axios'
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
import Aux from '../../hoc/Aux/Aux'
import {connect} from 'react-redux'
import * as actionCreators from '../../store/actions/index'
import './Orders.css'

class Orders extends Component {

    componentDidMount() {
        const token = this.props.tokenRedux;
        const userId = this.props.userIdRedux;
        this.props.onFetchOrders(token, userId)
    }

    render() {

        let orders = <Spinner/>;
        if (!this.props.loading)
            orders = (
                <Aux>
                    {this.props.ordersRedux.map(order =>
                        (<Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price}
                        />)
                    )}
                </Aux>
            );

        if (this.props.ordersRedux.length === 0) {
            orders = (
                <div className='orders' onClick={() => this.props.history.push('/')}>
                    <h2>No orders have been placed yet.</h2>
                    <p>Please make Your order!</p>
                    <p>Press to order!</p>
                </div>
            )
        }

        return (
            <div>{orders}</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ordersRedux: state.orders.orders,
        loadingRedux: state.orders.loading,
        tokenRedux: state.authentication.token,
        userIdRedux: state.authentication.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actionCreators.fetchOrders(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(Orders, axios));
