import React, { Component } from 'react';

import Aux from '../../hoc/Auxx';
import Burger from '../../components/Burger/Burger';
import ControlGroup from '../../components/ControlGroup/ControlGroup';

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
        purchaseable: false
    }

    updatePurchase = () => {
        const ccIngredients = {...this.state.ingredients}
        let sum=0
        for (let key in ccIngredients) {sum+= ccIngredients[key]}
        this.setState
    }

    addIngredientHandler = (type) => { 
        const count = this.state.ingredients[type] + 1
        const ccIngredients = {...this.state.ingredients}
        ccIngredients[type] = count
        
        this.setState({
            ingredients: ccIngredients,
            total: this.state.total + prices[type]
        })
        this.updatePurchase();
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
        this.updatePurchase();
    }

    render () {
        const disabledBtns = {...this.state.ingredients};
        for (let key in disabledBtns) {
            disabledBtns[key] = this.state.ingredients[key] < 1
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <ControlGroup 
                    added={this.addIngredientHandler}
                    removed={this.removeIngredientHandler}
                    disabled={disabledBtns} 
                    total={this.state.total}> </ControlGroup>
                    
                    
            </Aux>
        );
    }
}

export default BurgerBuilder;