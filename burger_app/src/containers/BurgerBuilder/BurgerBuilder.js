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
import * as actionCreators from '../../store/actions/index'


class BurgerBuilder extends Component {

    state = {
        isOrderNow: false
    };

    componentDidMount() {
        this.props.onInitIngredients()
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
        let burger = (this.props.errorRedux ? <p>Ingredients cannot be loaded</p> : <Spinner/>);
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
        priceRedux: state.totalPrice,
        errorRedux: state.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ingredient) => dispatch(actionCreators.addIngredient(ingredient)),
        onIngredientRemove: (ingredient) => dispatch(actionCreators.removeIngredient(ingredient)),
        onInitIngredients: () => dispatch(actionCreators.initIngredients())

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgerBuilder, axios));
