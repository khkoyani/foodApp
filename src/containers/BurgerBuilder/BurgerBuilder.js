import React, { Component } from 'react';
import axios from '../../axios-orders.js'
import Aux from '../../hoc/Auxx';
import Burger from '../../components/Burger/Burger';
import ControlGroup from '../../components/ControlGroup/ControlGroup';
import Modal from '../../components/UI/Modal/Modal.js';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary.js';
import Spinner from '../../components/UI/Spinner/Spinner.js'

const prices = {
    salad: .5, bacon: 2, cheese:1, meat: 2
}
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1
        },
        total: 6,
        purchaseable: false,
        checkout: false,
        sendingOrder: false,
    }
    
    closeBackdropHandler = () => {
        this.setState({checkout: false})
    }

    continueCheckoutHandler = () => {
        this.setState({sendingOrder: true})
        const order = {
            ingredients: this.state.ingredients,
            total: this.state.total,
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
            deliveryMethod: 'fastest',
        }
        axios.post('/orders.json', order)
            .then(r =>  {
                this.setState({
                    sendingOrder: false,
                    checkout: false
                })})
            .catch(err => {
                this.setState({
                    sendingOrder: false,
                    checkout: false
                })})
    }

    checkoutClickHandler = () => {
        this.setState({checkout: true})
    }

    updatePurchase = (ingredients) => {
        const ccIngredients = {...ingredients}
        let sum=0
        for (let key in ccIngredients) {sum+= ccIngredients[key]}
        this.setState({purchaseable: sum<=0})
    }

    addIngredientHandler = (type) => { 
        const count = this.state.ingredients[type] + 1
        const ccIngredients = {...this.state.ingredients}
        ccIngredients[type] = count
        
        this.setState({
            ingredients: ccIngredients,
            total: this.state.total + prices[type]
        })
        this.updatePurchase(ccIngredients);
    }

    removeIngredientHandler = (type) => { 
        const count = this.state.ingredients[type] - 1
        const ccIngredients = {...this.state.ingredients}
        if (ccIngredients<1) {
            return
        }
        ccIngredients[type] = count
        
        this.setState({
            ingredients: ccIngredients,
            total: this.state.total - prices[type]
        })
        this.updatePurchase(ccIngredients);
    }

    render () {
        const disabledBtns = {...this.state.ingredients};
        for (let key in disabledBtns) {
            disabledBtns[key] = this.state.ingredients[key] < 1
        }

        let orderSummary = <OrderSummary ingredients={this.state.ingredients}
            continue={this.continueCheckoutHandler} 
            cancel={this.closeBackdropHandler} total={this.state.total}
            />

        if (this.state.sendingOrder) {
            orderSummary = <Spinner></Spinner>
        }
        // let modal=null
        // if (this.state.checkout) {
        //     modal = <Modal><OrderSummary 
        //     ingredients={this.state.ingredients}/>
        //     </Modal>
        // } 
        return (
            <Aux>
                
                <Burger ingredients={this.state.ingredients} />
                <Modal show={this.state.checkout} close={this.closeBackdropHandler}>
                   {orderSummary} 
                </Modal>
                <ControlGroup 
                    added={this.addIngredientHandler}
                    removed={this.removeIngredientHandler}
                    disabled={disabledBtns} 
                    total={this.state.total}
                    upgradeable={this.state.purchaseable}
                    checkoutClick={this.checkoutClickHandler}> </ControlGroup>
                    
                    
            </Aux>
        );
    }
}

export default BurgerBuilder;