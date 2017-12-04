import React, {Component} from 'react'
import Person from './Person'


const Animal = (props) => {
    return (<div onClick={props.logging}>
        <p> It is a new animal. It's {props.age} is years old.</p>
    </div>)
};

const style = {
    backgroundColor: '#9a1',
    border: '3px solid #aa5',
    borderRadius: '4px',
    color: 'white'
};

class PersonsListArray extends Component {

    state = {
        persons: [
            {name: 'Unknown', age: 23},
            {name: 'Unknown', age: 32},
            {name: 'Unknown', age: 25}
        ],

        showPersons: false
    };

    changeName = (newName, newAge) => {
        this.setState({
            persons: [
                {name: newName, age: newAge},
                {name: newName, age: newAge},
                {name: newName, age: newAge}
            ]
        });
        console.log('no Mouse')
    };

    nameChangeHandler = (event) => {
        this.setState({
            persons: [
                {
                    name: this.state.persons[0].name,
                    age: this.state.persons[0].age
                },
                {
                    name: this.state.persons[1].name,
                    age: this.state.persons[1].age
                },
                {
                    name: event.target.value,
                    age: this.state.persons[2].age
                }
            ]
        })
    };

    togglePersonsHandler = () => {
        this.setState({
            showPersons: !this.state.showPersons
        })
    };

    render() {
        let persons = null;
        if (this.state.showPersons) {
            persons = (
                <div>
                    {this.state.persons.map((person) => {
                        return <Person
                            name={person.name}
                            age={person.age}
                        />
                    })}
                </div>
            )
        }

        return (
            <div className="App">
                <h2>Hello </h2>
                {persons}
                <Animal
                    logging={() => console.log('error')}
                    age={Math.ceil(Math.random() * 5)}
                />
                <button style={style} onClick={this.togglePersonsHandler}>
                    Switch Button
                </button>
            </div>
        )
    }
}

export default PersonsListArray;