
import React from 'react';
import Button from '../../UI/Button/Button.js'

const OrderSummary = (props) => {
    const ingredients = Object.keys(props.ingredients).map((k, v) => (
        <li key={k}>
            <span style={{textTransform: 'capitalize'}}>{k}</span>: {v}
            </li>
        )    
    )
    return (
        <div>
            <h3>Your Order</h3>
            <p>Burger with the following ingredients:</p>
            {ingredients}
            <p><strong>Total: ${props.total}</strong></p>
            <p>Continue to checkout</p>

            <Button btnType='Success' clicked={props.continue}>Continue</Button>
            <Button btnType='Danger' clicked={props.cancel}>Cancel</Button>
        </div>
    );
};

export default OrderSummary;