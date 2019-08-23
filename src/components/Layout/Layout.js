import React, {Component} from 'react';

import Aux from '../../hoc/Auxx';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar.js';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer.js';
import BlankBar from '../Navigation/Blankbar/Blankbar.js';

class layout extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            width: 0, 
            height: 0,
            showBackdrop: false};
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
      }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
      }
      
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
      }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      }

    openMenuHandler = () => {
        this.setState({showBackdrop: !this.state.showBackdrop})
        console.log(this.state.showBackdrop)
    }
    
    render () { 

        return (
        <div>

                {this.state.width>500 ? 
                    <Toolbar></Toolbar> 
                    : <BlankBar clicked={this.openMenuHandler}></BlankBar>}
                
                {this.state.showBackdrop ?
                    <SideDrawer clicked={this.openMenuHandler} show={this.state.showBackdrop}> </SideDrawer> 
                    : <div></div> }

                <main className={classes.Content}>
                    {this.props.children}
                </main>
        </div>
        )
    }
}

export default layout