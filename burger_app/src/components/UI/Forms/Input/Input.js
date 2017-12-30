import React from 'react';
import './Input.css'

const input = (props) => {

    let inputElement = null;
    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className='inputElement'
                {...props.elementConfig}
                value={props.value}
                onChange={props.changingValue}
            />;
            break;
        case('textarea'):
            inputElement = <textarea
                className='inputElement'
                {...props.elementConfig}
                value={props.value}
                onChange={props.changingValue}
            />;
            break;
        case('select'):
            inputElement = (
                <select
                    className='inputElement'
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changingValue}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className='inputElement'
                {...props.elementConfig}
                value={props.value}
                onChange={props.changingValue}
            />;
            break;
    }

    return (
        <div className='inputDiv'>
            <label className='labelInput'>{props.label}</label>
            {inputElement}
        </div>
    )
};

export default input;
