import React, {Component} from 'react'
import Person from './Person'


const Animal = (props) => {
    return (<div onClick={props.logging}>
        It is a new animal. It's {props.name} is years old.
    </div>)
};


class NewPerson extends Component {

    state = {
        persons: {name: 'Unknown', age: 23}
    };

    changeName = (newName) => {
        this.setState({
            persons: {name: newName, age: 23}
        });
        console.log('no Mouse')
    };

    render() {
        return (
            <div className="App">
                <h2>Hello </h2>
                <Person/>
                <Person name={this.state.persons.name} click={this.changeName.bind(this, 'Andy')}/>
                <Animal logging={() => console.log('error')}/>
            </div>
        )
    }
}

export default NewPerson;