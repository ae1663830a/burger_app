import React, {Component} from 'react';
import Imput from '../../components/UI/Forms/Input/Input'
import '../../components/Burger/OrderSummary/OrderSummary.css'
import './Authentication.css'
import * as actionCreators from '../../store/actions/index'
import {connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import {Redirect} from 'react-router-dom'

class Authentication extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter email'
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
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8,
                    maxLength: 40,
                },
                valid: false,
                isTouched: false
            },
        },
        isSignUp: true
    };

    componentDidMount() {
        if (!this.props.builtBurgerRedux && this.props.authRedirectPathRedux !== '/') {
            this.props.onSetAuthRedirectPath('/')
        }
    }

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
        if (rules.isEmail && isValid) {
            // eslint-disable-next-line
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = pattern.test(value)
        }
        return isValid;
    };

    changeInputValue = (event, element) => {
        const updatedControls = {
            ...this.state.controls,
            [element]: {
                ...this.state.controls[element],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[element].validation),
                isTouched: true
            }
        };

        let validForm = true;
        for (let element in updatedControls) {
            validForm = updatedControls[element].valid && validForm
        }
        this.setState({
            controls: updatedControls,
            formIsValid: validForm
        });
    };

    signUpHandler = (event) => {
        event.preventDefault();
        const email = this.state.controls.email.value;
        const password = this.state.controls.password.value;
        const isSignUp = this.state.isSignUp;
        this.props.onAuth(email, password, isSignUp)
    };

    switchAuthModeHandler = (event) => {
        event.preventDefault();
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        })
    };

    render() {
        const formElementsArray = [];
        for (let element in this.state.controls) {
            formElementsArray.push({
                id: element,
                config: this.state.controls[element]
            })
        }

        let form = formElementsArray.map(formElement => (
            <Imput
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
        ));

        if (this.props.loadingRedux) {
            form = <Spinner/>
        }

        let errorMessage = null;
        if (this.props.errorRedux) {
            errorMessage = (<p>{this.props.errorRedux.message}</p>)
        }

        let authRedirect = null;
        if (this.props.isAuthenticatedRedux) {
            authRedirect = <Redirect to={this.props.authRedirectPathRedux}/> // burgerBuilder changed state to '/checkout'
        }

        return (
            <div className="authentication">
                {authRedirect}
                <form onSubmit={this.signUpHandler}>
                    {form}
                    {errorMessage}
                    <button
                        disabled={!this.state.formIsValid}
                        type="submit"
                        className='Button Success'>
                        {this.state.isSignUp ? 'Sign up' : 'Login'}
                    </button>
                    <br/>
                    <button
                        type="none"
                        onClick={this.switchAuthModeHandler}
                        className='Button Danger'>
                        Switch to {this.state.isSignUp ? 'Login' : 'Sign up'}
                    </button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loadingRedux: state.authentication.loading,
        errorRedux: state.authentication.error,
        isAuthenticatedRedux: state.authentication.token,
        builtBurgerRedux: state.burgerBuilder.builtBurger,
        authRedirectPathRedux: state.authentication.authRedirectPath
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSingUp) => dispatch(actionCreators.auth(email, password, isSingUp)),
        onSetAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
