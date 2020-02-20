import React from 'react';
import { Provider } from 'react-redux';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import Beers from './pages/Beers';
import NotFound from './pages/NotFound';
import Beer from './pages/Beer';

import store from './store/store';
import history from './utils/history';

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/list" exact component={Beers} />
        <Route path="/list/:id" component={Beer} />
        <Redirect from="/" to="/list" exact />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
