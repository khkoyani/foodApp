import React from 'react';
import logoLocation from '../../assets/logo/logo1.jpg'
import classes from './Logo.css'

const logo = () => {
    return (
        <div className={classes.Logo}>
            <img src={logoLocation} alt="KoyBoyBurgers"
            style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'fill', 
            borderRadius: '10px'}}/>
        </div>
    );
};

export default logo;