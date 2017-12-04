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

    deletePersonHandler = (personIndex) => {
        const persons = this.state.persons;
        persons.splice(personIndex, 1);
        this.setState({
            persons: persons
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
                    {this.state.persons.map((person, index) => {
                        return <Person
                            click={() => this.deletePersonHandler(index)}
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