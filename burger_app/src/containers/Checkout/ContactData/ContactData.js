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
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: ''
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your phone'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street address'
                },
                value: ''
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
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
                value: ''
            },
        },
        loading: false
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
        updatedForm[element] = updatedFormElement;
        this.setState({
            orderForm: updatedForm
        });
        console.log(updatedForm[element].value, element)
    };

    render() {

        const formElementsArray = [];
        for (let element in this.state.orderForm){
            formElementsArray.push({
                id: element,
                config: this.state.orderForm[element]
            })
        }

        let form = (<form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changingValue={(event) => this.changeInputValue(event, formElement.id)}
                />
            ))}
            <button className='Button Success'>ORDER</button>
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
