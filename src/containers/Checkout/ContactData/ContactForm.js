import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders.js'
import Spinner from '../../../components/UI/Spinner/Spinner'


class ContactForm extends Component {
    state = {
        customer: {
            name: 'Karan Koyani',
            address: {
                street: '1234 asdfjk;l ln',
                zipCode: 12345,
                city: 'Charlotte',
                state: 'NC'
            },
            email: 'asdf@gmail.com'
        },
        sendingOrder: false
    }

  
    
    submitOrderHandler = (event) => {
        event.preventDefault()
        console.log('props in submit order', this.props)


        this.setState({sendingOrder: true})
        const order = {
            ingredients: this.props.ingredients,
            total: this.props.total,
            customer: this.state.customer,
            deliveryMethod: 'fastest',
        }
        axios.post('/orders.json', order)
            .then(r =>  {
                this.setState({ sendingOrder: false, })
                this.props.history.push('/')
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    sendingOrder: false,  
                })})
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.submitOrderHandler}>ORDER</Button>
            </form>
        );


        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {this.state.sendingOrder ? <Spinner /> : form }
            </div>
        );
    }
}

export default ContactForm;