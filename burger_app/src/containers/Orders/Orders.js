import React, {Component} from 'react';
import Order from '../../components/Order/Order'
import axios from '../../axios'
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
import Aux from '../../hoc/Aux/Aux'
import {connect} from 'react-redux'
import * as actionCreators from '../../store/actions/index'

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders()
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

        return <div>{orders}</div>;
    }
}

const mapStateToProps = state => {
    return {
        ordersRedux: state.orders.orders,
        loadingRedux: state.orders.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actionCreators.fetchOrders())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(Orders, axios));
