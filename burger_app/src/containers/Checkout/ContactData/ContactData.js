import React, {Component} from 'react';
import '../../../components/Burger/OrderSummary/OrderSummary.css'
import './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios'

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        phone: '',
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Andy Test',
                email: 'andy@unix.home'
            },
            deliveryType: 'fastDelivery'
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

    render() {
        let form = (<form>
            <input type='text' name='name' placeholder='Your name'/>
            <input type='email' name='email' placeholder='Your email'/>
            <input type='text' name='phone' placeholder='Your phone'/>
            <input type='text' name='street' placeholder='Street address'/>
            <input type='text' name='postal' placeholder='Postal code'/>
            <button className='Button Success' onClick={this.orderHandler}>ORDER</button>
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
