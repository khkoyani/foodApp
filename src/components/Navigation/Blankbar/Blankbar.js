import React from 'react';
import classes from './Blankbar.css'

const Blankbar = (props) => {

    return (
        <div className={classes.Blankbar}> 
            <button onClick={props.clicked}>Menu</button>
        </div>
    );
};

export default Blankbar;