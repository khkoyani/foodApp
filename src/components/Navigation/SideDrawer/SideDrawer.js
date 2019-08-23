import React from 'react';
import Logo from '../../Logo/Logo';
import Navitems from '../Navitems/Navitems';
import BackDrop from '../../UI/Backdrop/Backdrop.js'
import classes from './SideDrawer.css';
import Aux from '../../../hoc/Auxx.js';

const SideDrawer = (props) => {
    let clSideDrawer = ''
    if (props.show) {
        clSideDrawer = [classes.SideDrawer, classes.Open].join(' ')}
        else {
            clSideDrawer = [classes.SideDrawer, classes.Close].join('')
        }
        console.log(clSideDrawer)

    return (
        <Aux>
            
                <BackDrop close = {props.clicked} show={props.show}></BackDrop>

                <div className={clSideDrawer} >
                    <Logo></Logo>
                    <Navitems></Navitems>
                </div> 
                
        </Aux>
    );
};
// className={classes.SideDrawer}

export default SideDrawer;