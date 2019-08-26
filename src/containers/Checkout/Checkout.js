import React, { Component } from 'react';
import classes from './Checkout.css';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactForm from './ContactData/ContactForm'
import {Route} from 'react-router-dom'

class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     displayContactForm: false,
    // }
    constructor(props) {
        super(props);
        let qParams = new URLSearchParams(this.props.history.location.search)
        let ingredients = {}
        let total = 0
        for (let q of qParams.entries()){
            if (q[0] === 'total') {
                total = +q[1]
            } else {
                ingredients[q[0]] = +q[1]
            }
            
        }
        this.state = {
            ingredients: ingredients,
            total: total,
        }
        console.log('constructor', this.state)
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinueHandler = () => {
        this.props.history.push(this.props.match.path+'/contact')
    }

    render() {

     
        return (
            <div className={classes.Checkout}>
                <CheckoutSummary 
                    ingredients={this.state.ingredients} 
                    cancelled = {this.checkoutCancelHandler}
                    continue={this.checkoutContinueHandler}/>    

                <Route path={this.props.match.path+'/contact'} 
                render={(props) => (
                    <ContactForm ingredients={this.state.ingredients} total={this.state.total} {...props}/>
                    // pass props to render and distributing so contactform has access to history property to allow for redirect
                    )}/>
            </div>
        );
    }
}

export default Checkout;

