import React from 'react'
import Aux from '../../hoc/Aux'
import './Layout.css'

const layout = (props) => (
    <Aux>
        <div>
            Toolbar, Sidebar, Backdrop
        </div>

        <main id="main">
            {props.children}
        </main>
    </Aux>
);

export default layout;