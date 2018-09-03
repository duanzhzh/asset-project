import React, {Component} from 'react';
import {
  // BrowserRouter,
  Route,
  Switch,
  HashRouter as Router
} from 'react-router-dom';
import './scss/index.scss';
import './App.scss';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="content">
             Hello world
        </div>
      </Router>
    );
  }
}

export default App;
