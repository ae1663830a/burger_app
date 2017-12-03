import React, {Component} from 'react';
import './App.css';
import Person from './Person/Person'
import {personAsVar, personWithArgs} from './Person/PersonDiffExport'

class App extends Component {

    state = {
        persons: [
            {name: 'Tim', age: 21},
            {name: 'Dane', age: 23}
        ]
    };

    render() {
        return (
            <div className="App">
                <h1>Main header</h1>
                <Person name="Bill" age="20"> My hobbies are traveling and reading.</Person>
                <h4>{personAsVar()}</h4>
                <h4>{personWithArgs({name:"Bill", sex:"male"})}</h4>
                <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
            </div>
        );
    }
}

export default App;
