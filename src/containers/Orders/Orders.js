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
        axios.get('/orde')
            .then(r => {
                let orders = []
                for (let i in r.data) {
                    orders.push({id: i, ...r.data[i]})
                }
                this.setState({loading: false, orders: orders})
            })
            .catch(err => {
                console.log('error--', err)
            })
    }
    render() {
        console.log(this.state.orders)
        return (
            <div className={classes.Orders}>
                <h1>Orders</h1>
                <Order />
                <Order />
                <Order />
            </div>
        );
    }
}

export default withErrorHandler(Orders)