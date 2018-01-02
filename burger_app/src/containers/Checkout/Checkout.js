import React, {Component} from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route, Redirect} from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import {connect} from 'react-redux'

class Checkout extends Component {

    orderContinue = () => this.props.history.replace('/checkout/contact-data');
    orderCancel = () => this.props.history.goBack();

    render() {

        let summary = <Redirect to='/'/>;

        if (this.props.ingredientsRedux) {
            summary = (
                <div>
                    <CheckoutSummary
                        ingredients={this.props.ingredientsRedux}
                        orderContinue={this.orderContinue}
                        orderCancel={this.orderCancel}
                    />
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
                </div>
            )
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingredientsRedux: state.ingredients,
    }
};

export default connect(mapStateToProps)(Checkout);

