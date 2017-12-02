import React from 'react'

const person = (props) => {
    return (
        <div>
        <h3>I am {props.name} and I am {props.age} years old!</h3>
            <span>{props.children}</span>
        </div>
    )
};

export default person;