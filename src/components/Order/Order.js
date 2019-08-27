import React from 'react';
import classes from './Order.css'

const Order = (props) => {
    let ingredients = []
    for(let k in props.ingredients){
        ingredients.push({name:k, amount:props.ingredients[k]})
    }

    let spanIngredients = ingredients.map(i => (
        <span key={i.name} style={{
            textTransform: 'capitalize', display: 'inline-block', border: '1px solid #ccc',
            margin: '0 8px', padding: '5px'
        }}>{i.name}: {i.amount} <br/> </span>
        )
    )
    return (
        <div className={classes.Order}>
            Order id: {props.id}
            <p>Ingredients: {spanIngredients} <br/> </p>
            Price: <strong>{props.total}</strong>
        </div>
    );
};

export default Order;