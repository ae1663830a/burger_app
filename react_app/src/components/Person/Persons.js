import React from 'react'
import Person from './Person'

const persons = (props) => (
    props.persons.map((person, index) => {
        return <Person
            click={() => props.clicked(index)} // Calls deletePersonHandler only when click prop is called. If without arrow function it executes on-load.
            name={person.name}
            age={person.age}
            changeName={(event) => props.changeName(event, person.id)} // It executes onChange with event prop.
            changeAge={(event) => props.changeAge(event, person.id)}
            key={person.id}
        />
    }));

export default persons;