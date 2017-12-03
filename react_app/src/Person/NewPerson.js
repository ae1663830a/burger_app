import React, {Component} from 'react'
import Person from './Person'


const Animal = (props) => {
    return (<div onClick={props.logging}>
        <p> It is a new animal. It's {props.age} is years old.</p>
    </div>)
};

class NewPerson extends Component {

    state = {
        persons: {name: 'Unknown', age: 23}
    };

    changeName = (newName, newAge) => {
        this.setState({
            persons: {name: newName, age: newAge}
        });
        console.log('no Mouse')
    };

    nameChangeHandler = (event) => {
        this.setState({
            persons: {name: event.target.value, age: this.state.persons.age}
        })
    };

    render() {
        return (
            <div className="App">
                <h2>Hello </h2>
                <Person name={this.state.persons.name}
                        click={this.changeName.bind(this, 'Andy', 45)}
                        age={this.state.persons.age}
                        changed={this.nameChangeHandler}
                />
                <Animal logging={() => console.log('error')}
                        age={Math.ceil(Math.random() * 5)}
                />
            </div>
        )
    }
}

export default NewPerson;