import React, {Component} from 'react';
import Order from '../../components/Order/Order'
import axios from '../../axios'
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
import Aux from '../../hoc/Aux/Aux'

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        axios.get('orders.json').then(response => {
            const getOrders = [];
            for (let key in response.data) {
                getOrders.push({
                    ...response.data[key],
                    id: key
                })
            }
            this.setState({
                loading: false,
                orders: getOrders
            })
        }).catch(error => {
            this.setState({
                loading: false
            })
        })
    }

    render() {

        let order = (<Aux>
            {this.state.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />
            ))}
        </Aux>);

        if (this.state.orders.length === 0)
            order = <Spinner/>;

        return (
            <div>
                {order}
            </div>
        )
    }
}

export default errorHandler(Orders, axios);
