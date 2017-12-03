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

    switchNameHandler = () => {
        console.log('Was clicked');
        // Does not work this.state.persons[0].name = 'Andrew';
        this.setState({
            persons: [
                {name: 'Timothy', age: 21},
                {name: 'Dane', age: 23}
            ]
        })
    };

    switchNameHandler2 = () => {
        console.log('no Mouse')
    };

    render() {
        return (
            <div className="App">
                <h1>Main header</h1>
                <Person name="Bill" age="20"> My hobbies are traveling and reading.</Person>
                <h4 onClick={this.switchNameHandler}>{personAsVar()}</h4>
                <h4>{personWithArgs({name: "Bill", sex: "male"})}</h4>
                <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
                <button onClick={this.switchNameHandler} onMouseOut={this.switchNameHandler2}>Switch Button</button>
            </div>
        );
    }
}

export default App;