import React, {Component} from 'react';
import '../../../components/Burger/OrderSummary/OrderSummary.css'
import './ContactData.css'
import Input from '../../../components/UI/Forms/Input/Input'
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios'

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
                    maxLength: 40
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
                    maxLength: 20
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
                    maxLength: 5
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
        loading: false,
        formIsValid: false
    };

    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules.required && isValid) {
            isValid = value.trim() !== '';
        }
        if (rules.minLength && isValid) {
            isValid = value.length >= rules.minLength
        }
        if (rules.maxLength && isValid) {
            isValid = value.length <= rules.maxLength
        }
        return isValid;
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});

        const formData = {};
        for (let formElement in this.state.orderForm) {
            formData[formElement] = this.state.orderForm[formElement].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/')
            })
            .catch(onerror => {
                this.setState({loading: false})
            });
    };

    changeInputValue = (event, element) => {
        const updatedForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedForm[element]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedForm[element] = updatedFormElement;
        console.log(updatedFormElement);
        updatedFormElement.isTouched = true;

        let validForm = true;
        for (let element in updatedForm) {
            validForm = updatedForm[element].valid && validForm
        }
        this.setState({
            orderForm: updatedForm,
            formIsValid: validForm
        });
        console.log(updatedForm[element].value, element)
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
        if (this.state.loading) {
            form = <Spinner/>
        }

        return (
            <div className='contactData'>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;
