import React from 'react';
import classes from './Input.css'

const Input = (props) => {
    let inputEl = null
    const inputClasses = [classes.InputEl]
    if (!props.isValid && props.edited) {inputClasses.push(classes.Invalid)}
    switch (props.inputType) {
        case ('input'):
            inputEl = <input className={inputClasses.join(' ')} value={props.value} onChange={props.changed} {...props.elementConfig}/>
            break;
        case ('textarea'):
            inputEl = <textarea className={inputClasses.join(' ')} onChange={props.changed}/>
            break;
        case ('select'):
            inputEl = (
                <select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map(i => (
                        <option key={i.value} value={i.value}>{i.display}</option>
                    ))}
                </select>
            )
            break;
        default:
            inputEl = <input className={inputClasses.join(' ')} value={props.value} onChange={props.changed} {...props.elementConfig}/>
            break;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputEl}
        </div>
    );
};

export default Input;