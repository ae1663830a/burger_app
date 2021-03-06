import React, {Component} from 'react';
import '../../../components/Burger/OrderSummary/OrderSummary.css'
import './ContactData.css'
import Input from '../../../components/UI/Forms/Input/Input'
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios'
import {connect} from 'react-redux'
import * as actionCreators from '../../../store/actions/index'
import errorHandler from '../../../hoc/ErrorHandler/ErrorHandler'
import {updateObject, checkValidity} from "../../../shared/utility"

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 40
                },
                valid: false,
                isTouched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 40,
                    isEmail: true
                },
                valid: false,
                isTouched: false
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your phone'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    isNumber: true
                },
                valid: false,
                isTouched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                isTouched: false
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumber: true
                },
                valid: false,
                isTouched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                isTouched: false
            },
            deliveryType: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'standard', displayValue: 'Standard'},
                        {value: 'fast', displayValue: 'Fast'},
                        {value: 'nextDay', displayValue: 'Next day'},
                    ]
                },
                value: 'standard',
                validation: {
                    required: true
                },
                valid: true,
                isTouched: false
            },
        },
        formIsValid: false
    };

    changeInputValue = (event, element) => {
        const updatedFormElement = updateObject(this.state.orderForm[element], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[element].validation),
            isTouched: true
        });
        const updatedForm = updateObject(this.state.orderForm, {
            [element]: updatedFormElement
        });

        let validForm = true;
        for (let element in updatedForm) {
            validForm = updatedForm[element].valid && validForm
        }
        this.setState({
            orderForm: updatedForm,
            formIsValid: validForm
        });
    };

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElement in this.state.orderForm) {
            formData[formElement] = this.state.orderForm[formElement].value;
        }

        const order = {
            ingredients: this.props.ingredientsRedux,
            price: this.props.priceRedux.toFixed(2),
            orderData: formData,
            userId: this.props.userIdRedux
        };
        const token = this.props.tokenRedux;
        this.props.onOrderBurger(order, token);
    };

    render() {
        const formElementsArray = [];
        for (let element in this.state.orderForm) {
            formElementsArray.push({
                id: element,
                config: this.state.orderForm[element]
            })
        }

        let form = (<form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement => (
                <Input
                    // label={(formElement.id)}
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    isTouched={formElement.config.isTouched}
                    changingValue={(event) => this.changeInputValue(event, formElement.id)}
                />
            ))}
            <button disabled={!this.state.formIsValid} className='Button Success'>ORDER</button>
        </form>);
        if (this.props.loadingRedux) {
            form = <Spinner/>
        }

        return (
            <div className='orders'>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredientsRedux: state.burgerBuilder.ingredients,
        priceRedux: state.burgerBuilder.totalPrice,
        loadingRedux: state.order.loading,
        tokenRedux: state.authentication.token,
        userIdRedux: state.authentication.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actionCreators.purchaseBurger(orderData, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(ContactData, axios));
