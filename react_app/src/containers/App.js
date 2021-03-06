import React, {PureComponent} from 'react'
import Persons from '../components/Person/Persons'


class App extends PureComponent {

    state = {
        persons: [
            {id: 'a', name: 'Unknown', age: 23},
            {id: 'b', name: 'Unknown', age: 32},
            {id: 'c', name: 'Unknown', age: 25}
        ],

        showPersons: false,
        toggleClicked: 0
    };

    deletePersonHandler = (personIndex) => {
        const newPersons = [...this.state.persons]; // Creates a new array of persons by copying the persons array.
        newPersons.splice(personIndex, 1); // Remove elements: starting at personIndex, 1 = total number of elements to remove.
        this.setState({
            persons: newPersons // Re-assign (in classes state) persons array after deletion.
        })
    };

    togglePersonsHandler = () => {
        this.setState((prevState) => {
            return {
                showPersons: !this.state.showPersons,
                toggleClicked: prevState.toggleClicked + 1
            }
        })
    };

    changeNameHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(person => {
            return person.id === id; // Finds element by id
        });

        const newPerson = {
            ...this.state.persons[personIndex]
        }; // Creates a new array by copying the old array, and retrieves the element by index.

        newPerson.name = event.target.value; // Changes retrieved person's name.

        const newPersons = [...this.state.persons]; // Creates a new array by copying the old array.
        newPersons[personIndex] = newPerson; // Assigns retrieved element to a just created array.

        this.setState({
            persons: newPersons // Changes state to new, replaces the old array to a just created array.
        });
    };

    changeAge = (event, id) => {
        const personIndex = this.state.persons.findIndex(person => {
            return person.id === id;
        });
        const newPerson = {
            ...this.state.persons[personIndex]
        };
        newPerson.age = event.target.value;
        const newPersons = [...this.state.persons];
        newPersons[personIndex] = newPerson;
        this.setState({
            persons: newPersons
        });
    };

    render() {

        const style = {
            backgroundColor: '#9a1',
            border: '3px solid #aa5',
            borderRadius: '4px',
            color: 'white',
            margin: '10px',
            width: '120px',
            height: '30px',
            hover: 'blue'
        };

        let persons = null;
        if (this.state.showPersons) {
            style.backgroundColor = '#C49';
            style.border = '3px solid #e25';
            if (this.state.persons.length > 0) {
                persons = (
                    <div>
                        <Persons
                            persons={this.state.persons}
                            clicked={this.deletePersonHandler}
                            changeName={this.changeNameHandler}
                            changeAge={this.changeAge}
                        />
                    </div>
                );
            } else {
                persons = (<h2>The list is empty.</h2>)
            }
        }

        const button = this.state.showPersons ? 'Hide' : 'Show';

        return (
            <div className="App">
                {this.state.toggleClicked}
                <h2>Hello Everyone!</h2>
                {this.props.title}<br/>
                {persons}
                <button style={style} onClick={this.togglePersonsHandler}>
                    {button}
                </button>
            </div>
        )
    }
}

export default App;