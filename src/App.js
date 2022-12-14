import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/carteira" component={ Wallet } />
          <Route exact path="/" component={ Login } />
        </Switch>
      </div>
    );
  }
}

export default App;
