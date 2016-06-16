import React from 'react';
import { Provider } from 'react-redux';

import FullCartContainer from '../containers/FullCartContainer';

// See documentation for https://github.com/reactjs/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.
export default (props) => {
  const cartStore = ReactOnRails.getStore("cartStore");
  const reactComponent = (
    <Provider store={cartStore}>
      <FullCartContainer/>
    </Provider>
  );
  return reactComponent;
};
