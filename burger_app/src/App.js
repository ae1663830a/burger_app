import React, {Component} from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import Authentication from './containers/Authentication/Authentication'
import Logout from "./containers/Authentication/Logout/Logout";
import {connect} from 'react-redux'
import * as actionCreators from './store/actions/index'
import asyncComponent from './hoc/asyncComponent/asyncComponent'

const asyncOrders = asyncComponent(() => {
    return import('./containers/Orders/Orders')
});

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoLogin()
    }

    render() {

        let routes = (
            <Switch>
                <Route path="/login" component={Authentication}/>
                <Route path="/" exact component={BurgerBuilder}/>
                <Redirect to="/"/>
            </Switch>
        );

        if (this.props.isAuthenticatedRedux) {
            routes = (
                <Switch>
                    <Route path="/login" component={Authentication}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/orders" component={asyncOrders}/>
                    <Route path="/" exact component={BurgerBuilder}/>
                    <Redirect to="/"/>
                </Switch>
            );
        }

        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticatedRedux: state.authentication.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoLogin: () => dispatch(actionCreators.authCheckState())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

