import React from 'react';
import classes from './Navitems.css'
import {NavLink} from 'react-router-dom'

const Navitems = () => {
    return (
        <div className={classes.Navitems}>
            <NavLink to='/' exact className={classes.NavLink} activeClassName={classes.active}>Build Burger</NavLink>
            <NavLink to='/orders'  className={classes.NavLink} activeClassName={classes.active}>Orders</NavLink>
            </div>
    );
};

export default Navitems;