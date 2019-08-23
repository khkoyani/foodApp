import React, {Component} from 'react';
import classes from './Modal.css'
import Backdrop from '../Backdrop/Backdrop.js'
import Aux from '../../../hoc/Auxx.js'


class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        console.log('nextprops: ', nextProps)
        console.log('nextState: ', nextState)
        console.log('this.props: ', this.props)
        if (nextProps.show !== this.props.show) {
            return true
        } else {
            return false
        }
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} close={this.props.close}/>
                <div className={classes.Modal}
                    style={{ 
                        transform: this.props.show ? 
                            'translateY(0)': 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                        }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;
