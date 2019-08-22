import React from 'react';
import classes from './Navitems.css'

const Navitems = () => {
    console.log(classes.Navitems, classes.Navitem)
    return (
        <nav className={classes.Navitems}>
            <ul className={classes.Navitem} ><a  href="#" className={classes.active}>Build Burger</a></ul>
            <ul className={classes.Navitem}><a href="#">Checkout</a></ul>
            </nav>
    );
};

export default Navitems;