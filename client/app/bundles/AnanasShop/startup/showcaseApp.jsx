import React from 'react';
import { Provider } from 'react-redux';
import Showcase from '../containers/ShowcaseContainer';
import { Route, Router, browserHistory } from 'react-router'

export default (props) => {
  const cartStore = ReactOnRails.getStore("cartStore");
  const reactComponent = (
    <Provider store={ cartStore }>
      <Router history={ browserHistory }>
        <Route path='/categories/:categoryId' component={Showcase}/>
      </Router>
    </Provider>
  );
  return reactComponent;
};
