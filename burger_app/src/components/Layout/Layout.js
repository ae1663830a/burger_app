import React from 'react'
import Aux from '../../hoc/Aux'
import './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

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
                <Toolbar openMenu={this.sideDrawerToggle}/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerToggle}/>
                <main id="main">
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;