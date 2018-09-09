import React, {Component} from 'react';
import {
  // BrowserRouter,
  Route,
  Switch,
  HashRouter as Router
} from 'react-router-dom';
import {Provider} from 'react-redux'
import './scss/index.scss';
import './app.scss';
import configureStore from './configureStore'

import Home from './containers/market/home'
import HomeA from './containers/market/homeA'

class App extends Component {
  render() {
    const store = configureStore();
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path={'/home'} component={Home}/>
            <Route exact path={'/homea'} component={HomeA}/>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
