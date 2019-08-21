import React from 'react';
import classes from './Modal.css'
import Backdrop from '../Backdrop/Backdrop.js'
import Aux from '../../../hoc/Auxx.js'

const modal = (props) => {
    return (
        <Aux>
            <Backdrop show={props.show} close={props.close}/>
            <div className={classes.Modal}
                style={{ 
                    transform: props.show ? 
                        'translateY(0)': 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                    }}>
                {props.children}
            </div>
        </Aux>
    );
}

export default modal