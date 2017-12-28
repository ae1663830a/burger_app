import React, {Component} from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.3,
    meat: 1.2,
    bacon: 0.8
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 1,
        canBeOrdered: false,
        isOrderNow: false
    };

    orderContinue = () => {
      alert('You are going to buy it!')
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
        this.setState({canBeOrdered: sum > 0})
    };

    addIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updateOrderState(updatedIngredients)
    };

    deductIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount > 0) {
            const updatedCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            const priceDeduction = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceDeduction;
            this.setState({
                totalPrice: newPrice,
                ingredients: updatedIngredients
            });
            this.updateOrderState(updatedIngredients)
        }

    };

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return (
            <Aux>
                <Modal show={this.state.isOrderNow} hide={this.orderNow}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        orderCancel={this.orderNow}
                        orderContinue={this.orderContinue}
                        price={this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    addIngredient={this.addIngredient}
                    deductIngredient={this.deductIngredient}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    canBeOrdered={this.state.canBeOrdered}
                    order={this.orderNow}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder;
