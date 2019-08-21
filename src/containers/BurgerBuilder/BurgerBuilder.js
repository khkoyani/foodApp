import React, { Component } from 'react';

import Aux from '../../hoc/Auxx';
import Burger from '../../components/Burger/Burger';
import ControlGroup from '../../components/ControlGroup/ControlGroup';
import Modal from '../../components/UI/Modal/Modal.js';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary.js'

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
    }
    
    closeBackdropHandler = () => {
        this.setState({checkout: false})
    }

    continueCheckoutHandler = () => {
        alert('You Continue')
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

        // let modal=null
        // if (this.state.checkout) {
        //     modal = <Modal><OrderSummary 
        //     ingredients={this.state.ingredients}/>
        //     </Modal>
        // } 
        return (
            <Aux>
                if
                <Burger ingredients={this.state.ingredients} />
                <Modal show={this.state.checkout} close={this.closeBackdropHandler}>
                    <OrderSummary ingredients={this.state.ingredients}
                        continue={this.continueCheckoutHandler} 
                        cancel={this.closeBackdropHandler} total={this.state.total}/>
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