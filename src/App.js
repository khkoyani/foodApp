import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Switch, Route} from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout.js'
import Orders from './containers/Orders/Orders'
class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path={'/'} exact component={BurgerBuilder} />
            <Route path={'/orders'} component={Orders} />

          </Switch>
          <Route path={'/checkout'} exact component={Checkout} />
        </Layout>
      </div>
    );
  }
}

export default App;
