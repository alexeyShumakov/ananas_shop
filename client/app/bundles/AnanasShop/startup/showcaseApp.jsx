import React from 'react';
import { Provider } from 'react-redux';
import Showcase from '../containers/ShowcaseContainer';
import Wrapper from '../containers/ShowcaseWrapper';
import { Route, Router, browserHistory } from 'react-router'

export default (props) => {
  const cartStore = ReactOnRails.getStore("cartStore");
  const reactComponent = (
    <Provider store={ cartStore }>
      <Router history={ browserHistory }>
        <Route path='/categories' component={Wrapper}>
          <Route path='/categories/:categoryId' component={Showcase}/>
        </Route>
      </Router>
    </Provider>
  );
  return reactComponent;
};
