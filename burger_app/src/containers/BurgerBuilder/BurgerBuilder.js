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
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    };

    orderNow = () => {
        if (this.props.isAuthenticatedRedux) {
            this.setState({
                isOrderNow: !this.state.isOrderNow
            })
        } else {
            this.props.onSetAuthRedirectPath('/checkout'); // changing authRedirectPath to '/checkout'
            this.props.history.push('/login')
        }

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
                        isAuth={this.props.isAuthenticatedRedux}
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
        ingredientsRedux: state.burgerBuilder.ingredients,
        priceRedux: state.burgerBuilder.totalPrice,
        errorRedux: state.burgerBuilder.error,
        isAuthenticatedRedux: state.authentication.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ingredient) => dispatch(actionCreators.addIngredient(ingredient)),
        onIngredientRemove: (ingredient) => dispatch(actionCreators.removeIngredient(ingredient)),
        onInitIngredients: () => dispatch(actionCreators.initIngredients()),
        onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgerBuilder, axios));
