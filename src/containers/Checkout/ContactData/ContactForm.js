import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders.js'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Forms/Input/Input.js'


class ContactForm extends Component {
create_OrderFormFields ({elementType='input', type='text', placeholder='', value=''}) {
    return {
        elementType: elementType,
        elementConfig: {
            type: type,
            placeholder: placeholder
        },
        value: value
    }
}
    state = {
        orderForm: {
            name: this.create_OrderFormFields({placeholder:'Your Name'}),
            street: this.create_OrderFormFields({placeholder:'Street'}),
            zipCode: this.create_OrderFormFields({placeholder:'Zip Code'}),
            city: this.create_OrderFormFields({placeholder:'City'}),
            state: this.create_OrderFormFields({placeholder:'State'}),
            email: this.create_OrderFormFields({placeholder:'Email'}),
            deliveryStyle: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', display: 'Fastest '},
                        {value: 'cheapest', display: 'Cheapest '}]
                    },
                value: ''
            }
        },  
        sendingOrder: false
    }
    // {
    //     name: 'Karan Koyani',
    //     address: {
    //         street: '1234 asdfjk;l ln',
    //         zipCode: 12345,
    //         city: 'Charlotte',
    //         state: 'NC'
    //     },
    //     email: 'asdf@gmail.com'
    // },  
    
    submitOrderHandler = (event) => {
        event.preventDefault()

        let formData = {}
        let deliverytype = ''
        for (let i in this.state.orderForm) {
            if (i != 'deliveryStyle') {
                formData[i] = this.state.orderForm[i].value
            } else {
                deliverytype = this.state.orderForm[i].value
            }
                
        }



        this.setState({sendingOrder: true})
        const order = {
            ingredients: this.props.ingredients,
            total: this.props.total,
            customer: formData,
            deliveryMethod: deliverytype
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

    inputChangeHandler = (event, field) => {
        const ccorderForm = {...this.state.orderForm};
        const ccField = {...ccorderForm[field]};
        ccField.value=event.target.value
        ccorderForm[field]=ccField
        
        this.setState({orderForm: ccorderForm})

    }



    render() {
        let eleArr = []
        for (let i in this.state.orderForm) {
            eleArr.push({id: i, elementType: this.state.orderForm[i].elementType, 
                elementConfig: this.state.orderForm[i].elementConfig, value: this.state.orderForm[i].value})
        }

        let formEl = eleArr.map(i => (
            <Input key={i.id} name={i.id} value={i.value}
                inputType={i.elementType} elementConfig={i.elementConfig}
                changed={(event) => {this.inputChangeHandler(event, i.id)}} />
        ))


        let form = (
            <form onSubmit={this.submitOrderHandler}>
                {formEl}
                <Button btnType="Success">ORDER</Button>
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