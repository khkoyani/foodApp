import classes from './ControlGroup.css'
import React from 'react';
import ControlElement from './ControlElement/ControlElement'

const controlList = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
]


const ControlGroup = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div>Total: $<strong>{props.total}</strong></div>
            {controlList.map((item) => (
                <ControlElement label={item.label} key={item.label} 
                    added={() => props.added(item.type)}
                    removed={() => props.removed(item.type)}
                    disabled={props.disabled[item.type]}
                    upgradeable={!props.upgradeable}
                   />
                    )
                )}
            <button className={classes.OrderButton} disabled={props.upgradeable}> Checkout</button>
        </div>
           
    );
}; 

export default ControlGroup;