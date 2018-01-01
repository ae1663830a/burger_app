import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler'
import axios from '../../axios'
import {connect} from 'react-redux'
import * as actionTypes from '../../store/actions'


class BurgerBuilder extends Component {

    state = {
        isOrderNow: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        // axios.get('ingredients.json').then(response => {
        //     this.setState({ingredients: response.data})
        // }).catch(error => {
        //     this.setState({error: true})
        // })
    }

    orderContinue = () => {
        this.props.history.push('/checkout');
    };

    orderNow = () => {
        this.setState({
            isOrderNow: !this.state.isOrderNow
        })
    };

    updateOrderState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(ingredientsKey => {
                return ingredients[ingredientsKey];
            }).reduce((sum, el) => sum + el, 0);
        return sum > 0
    };

    render() {

        const disabledInfo = {
            ...this.props.ingredientsRedux
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = (this.state.error ? <p>Ingredients cannot be loaded</p> : <Spinner/>);
        if (this.props.ingredientsRedux) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredientsRedux}/>
                    <BuildControls
                        addIngredient={this.props.onIngredientAdd}
                        deductIngredient={this.props.onIngredientRemove}
                        disabled={disabledInfo}
                        price={this.props.priceRedux}
                        canBeOrdered={this.updateOrderState(this.props.ingredientsRedux)}
                        order={this.orderNow}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ingredientsRedux}
                orderCancel={this.orderNow}
                orderContinue={this.orderContinue}
                price={this.props.priceRedux}
            />;
        }
        if (this.state.loading) {
            orderSummary = <Spinner/>
        }

        return (
            <Aux>
                <Modal show={this.state.isOrderNow} hide={this.orderNow}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredientsRedux: state.ingredients,
        priceRedux: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ingredient) => dispatch({
            type: actionTypes.ADD_INGREDIENT,
            ingredientName: ingredient,
            value: 1
        }),
        onIngredientRemove: (ingredient) => dispatch({
            type: actionTypes.REMOVE_INGREDIENT,
            ingredientName: ingredient,
            value: -1
        })

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgerBuilder, axios));
