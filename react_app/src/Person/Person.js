import React from 'react'

const person = (props) => {
    return (
        <div>
        <h3 onClick={props.click}>I am {props.name} and I am {props.age} years old!</h3>
            <span>{props.children}</span>
            <input type="text" value={props.name} onChange={props.changeName}/>
            <input type="text" value={props.age} onChange={props.changeAge}/>
        </div>
    )
};

export default person;