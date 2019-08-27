import React from 'react';
import classes from './Input.css'

const Input = (props) => {
    console.log('inputcomp--', props)
    let inputEl = null
    switch (props.inputType) {
        case ('input'):
            inputEl = <input className={classes.InputEl} value={props.value} onChange={props.changed} {...props.elementConfig}/>
            break;
        case ('textarea'):
            inputEl = <textarea className={classes.InputEl} onChange={props.changed}/>
            break;
        case ('select'):
            inputEl = (
                <select className={classes.InputEl} value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map(i => (
                        <option key={i.value} value={i.value}>{i.display}</option>
                    ))}
                </select>
            )
            break;
        default:
            inputEl = <input className={classes.InputEl} value={props.value} onChange={props.changed} {...props.elementConfig}/>
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