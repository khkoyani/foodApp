import React from 'react';
import Burger from '../../Burger/Burger.js'
import Button from '../../UI/Button/Button'

const CheckoutSummary = (props) => {
    return (
        <div>
            <Burger ingredients = {props.ingredients}></Burger>
            <div style = {{margin: 'auto', width:'fit-content'}}>
                <Button btnType='Danger' clicked={props.cancelled}>CANCEL</Button>
                <Button btnType='Success' clicked={props.continue}>CONTINUE</Button>
            </div>
        </div>
    );
};

export default CheckoutSummary;