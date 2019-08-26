import React, { Component } from 'react';
import axios from '../../axios-orders.js'
import Aux from '../../hoc/Auxx';
import Burger from '../../components/Burger/Burger';
import ControlGroup from '../../components/ControlGroup/ControlGroup';
import Modal from '../../components/UI/Modal/Modal.js';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary.js';
import Spinner from '../../components/UI/Spinner/Spinner.js';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler.js'
import Link from 'react-router-dom'

const prices = {
    salad: .5, bacon: 2, cheese:1, meat: 2
}
class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        total: 6,
        purchaseable: false,
        checkout: false,
        sendingOrder: false,
        error: false,
    }

    componentDidMount () {
        console.log(this.props.history)
        axios.get('/ingredients.json')
            .then(r => {
                this.setState({ingredients: r.data})
            })
            .catch(err => {
                this.setState({error: true})
            })
    }
    
    closeBackdropHandler = () => {
        this.setState({checkout: false})
    }

    continueCheckoutHandler = () => {
        let ingredients = []
        for (let i in this.state.ingredients) {
            ingredients.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        ingredients.push('total=' + encodeURIComponent(this.state.total))
        console.log('ing', ingredients)
        this.props.history.push({
            pathname: '/checkout/', 
            search: '?' + ingredients.join('&')
        })
        
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

        let orderSummary = null
        let burger = <Spinner></Spinner>


        if (this.state.ingredients) {
            burger = (
                <div style={{marginTop: '60px'}}>
                    <Burger ingredients={this.state.ingredients} />
                    <ControlGroup 
                        added={this.addIngredientHandler}
                        removed={this.removeIngredientHandler}
                        disabled={disabledBtns} 
                        total={this.state.total}
                        upgradeable={this.state.purchaseable}
                        checkoutClick={this.checkoutClickHandler}> 
                    </ControlGroup> 
                 </div>
            )
            orderSummary = (
                <OrderSummary ingredients={this.state.ingredients}
                    continue={this.continueCheckoutHandler} 
                    cancel={this.closeBackdropHandler} total={this.state.total}>
                </OrderSummary>
            )
        }
        if (this.state.sendingOrder) {
            orderSummary = <Spinner></Spinner>
        }
        if (this.state.error) {burger = <p>Unable to load ingredients</p>}

        return (
            <Aux>
                {burger}
                <Modal show={this.state.checkout} close={this.closeBackdropHandler}>
                   {orderSummary} 
                </Modal>       
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);