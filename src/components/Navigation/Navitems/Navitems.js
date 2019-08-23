import React from 'react';
import classes from './Navitems.css'

const Navitems = () => {
    return (
        <div className={classes.Navitems}>
            <ul className={classes.Navitem} ><a className={classes.active} href="#" >Build Burger</a></ul>
            <ul className={classes.Navitem}><a href="#">Checkout</a></ul>
            <ul className={classes.Navitem}><a href="#">Link3</a></ul>
            </div>
    );
};

export default Navitems;