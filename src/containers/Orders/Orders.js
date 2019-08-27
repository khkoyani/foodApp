import React, { Component } from 'react';
import classes from './Orders.css';
import Order from '../../components/Order/Order.js'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler.js'



class Orders extends Component {
    state= {
        orders: [],
        loading: true,

    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(r => {
                let orders = []
                for (let k in r.data) {
                    orders.push({id: k, ...r.data[k]})
                }
                this.setState({loading: false, orders: orders})
            })
            .catch(err => {
                console.log('error--', err)
            })
    }
    render() {
        return (
            <div className={classes.Orders}>
                <h1>Orders</h1>
                {this.state.orders.map(i => (
                    <Order key={i.id} ingredients={i.ingredients} id={i.id}
                        total={i.total} deliveryMethod={i.deliveryMethod}/>
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders)