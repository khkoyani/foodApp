import React from 'react';
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo.js'
import Navitems from '../Navitems/Navitems.js'

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <div>Menu</div>
            <Logo></Logo>
            <Navitems></Navitems>
        </header>
    );
};

export default toolbar;