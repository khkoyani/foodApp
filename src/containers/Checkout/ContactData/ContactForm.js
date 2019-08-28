import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders.js'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Forms/Input/Input.js'


class ContactForm extends Component {
    create_OrderFormFields ({elementType='input', type='text', placeholder='', value='', fieldRules={}}) {
        const defaultRules = {required: true}
        return {
            elementType: elementType,
            elementConfig: {
                type: type,
                placeholder: placeholder
            },
            value: value,
            validationRules: {...fieldRules, ...defaultRules},
            isValid: false,
            errors: {},
            edited: false,
        }
    }

    state = {
        orderForm: {
            name: this.create_OrderFormFields({placeholder:'Your Name'}),
            street: this.create_OrderFormFields({placeholder:'Street'}),
            zipCode: this.create_OrderFormFields({placeholder:'Zip Code', fieldRules: {minLength: 5, maxLength: 5}}),
            city: this.create_OrderFormFields({placeholder:'City'}),
            state: this.create_OrderFormFields({placeholder:'State'}),
            email: this.create_OrderFormFields({placeholder:'Email'}),
            deliveryStyle: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', display: 'Fastest'},
                        {value: 'cheapest', display: 'Cheapest' }]
                    },
                value: 'fastest',
                validationRules: null,
                isValid: true,
                errors: null,
                edited: true,
            }
        },
        formIsValid: false,  
        sendingOrder: false
    }
    
    validation = (value, rules) => {
        let isValid = true
        let errors = {field: 'toolong'}
        if (rules) {
            if (rules.required) {
                isValid = value.trim() !== '' && isValid
            }
            if (rules.minLength) {
                isValid = value.length >= rules.minLength && isValid
            }
            if (rules.maxLength) {
                isValid = value.length <= rules.maxLength && isValid
            }
        }
        

        return [isValid, errors]
    }

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
        ccField.edited = true

        let [isValid, errors] = [...this.validation(ccField.value, ccField.validationRules)]
        ccField.isValid = isValid
        ccField.errors = errors

        let formIsValid = true
        for (let field in ccorderForm) {
            formIsValid = formIsValid && ccorderForm[field].isValid
        }
        ccorderForm[field]=ccField
        console.log(ccField)
        this.setState({orderForm: ccorderForm, formIsValid: formIsValid})

    }



    render() {
        let eleArr = []
        for (let i in this.state.orderForm) {
            eleArr.push({id: i, elementType: this.state.orderForm[i].elementType,
                elementConfig: this.state.orderForm[i].elementConfig, value: this.state.orderForm[i].value, 
                isValid: this.state.orderForm[i].isValid, edited: this.state.orderForm[i].edited
            })
        }

        let formEl = eleArr.map(i => (
            <Input key={i.id} name={i.id} value={i.value}
                inputType={i.elementType} elementConfig={i.elementConfig}
                changed={(event) => {this.inputChangeHandler(event, i.id)}}
                isValid={i.isValid} edited={i.edited} 
                />
        ))


        let form = (
            <form onSubmit={this.submitOrderHandler}>
                {formEl}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
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