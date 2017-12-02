import React, {Component} from 'react';
import './App.css';
import Person from './Person/Person'
import {personAsVar} from './Person/PersonDiffExport'

class App extends Component {

    render() {
        return (
            <div className="App">
                <h1>Main header</h1>
                <Person/>
                <h4>{personAsVar()}</h4>
            </div>
        );
    }
}

export default App;
