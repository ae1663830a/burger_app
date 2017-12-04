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

class ToggleListPersons extends Component {

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
        return (
            <div className="App">
                <h2>Hello </h2>
                {
                    this.state.showPersons ? // If it is true = show the div block below
                        <div>
                            <Person
                                name={this.state.persons[0].name}
                                click={this.changeName.bind(this, 'Andy', 45)}
                                age={this.state.persons[0].age}
                            />
                            <Person
                                name={this.state.persons[1].name}
                                click={this.changeName.bind(this, 'Andy', 45)}
                                age={this.state.persons[1].age}
                            />
                            <Person
                                name={this.state.persons[2].name}
                                click={this.changeName.bind(this, 'Andy', 45)}
                                age={this.state.persons[2].age}
                                changed={this.nameChangeHandler}
                            />
                        </div> : null // if it is false = show null 'nothing'
                }

                <Animal logging={() => console.log('error')}
                        age={Math.ceil(Math.random() * 5)}
                />
                <button style={style} onClick={this.togglePersonsHandler}>
                    Switch Button
                </button>
            </div>
        )
    }
}

export default ToggleListPersons;