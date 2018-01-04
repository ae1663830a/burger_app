import React from 'react'
import Aux from '../Aux/Aux'
import './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'

class Layout extends React.Component {

    state = {
        showSideDrawer: false
    };

    sideDrawerToggle = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    };

    render() {
        return (
            <Aux>
                <Toolbar
                    isAuth={this.props.isAuthenticatedRedux}
                    openMenu={this.sideDrawerToggle}/>
                <SideDrawer
                    isAuth={this.props.isAuthenticatedRedux}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerToggle}/>
                <main id="main">
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
  return {
      isAuthenticatedRedux: state.authentication.token
  }
};

export default connect(mapStateToProps)(Layout);