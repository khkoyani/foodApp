
import React, {Component} from 'react';
import Button from '../../UI/Button/Button.js'

class OrderSummary extends Component {

    render () {
        const ingredients = Object.keys(this.props.ingredients).map((k, v) => (
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
                <p><strong>Total: ${this.props.total}</strong></p>
                <p>Continue to checkout</p>
    
                <Button btnType='Success' clicked={this.props.continue}>Continue</Button>
                <Button btnType='Danger' clicked={this.props.cancel}>Cancel</Button>
            </div>
        )}
}



export default OrderSummary;