import React from 'react';
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo.js'
import Navitems from '../Navitems/Navitems.js';
import SideDrawer from '../SideDrawer/SideDrawer.js'

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <div>Menu</div>
            <Logo></Logo>
            <nav ><Navitems></Navitems></nav>
            
        </header>
    );
};

export default toolbar;