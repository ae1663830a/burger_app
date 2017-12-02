import React from 'react'

export const personAsVar = () => {
    return <h4>Variable export example</h4>
};

export const personWithArgs = (props) => {
    return <p>I am {props.name} and I am {Math.ceil(Math.random() * 10) + 20} years old! ({props.sex.toUpperCase()})</p>
};