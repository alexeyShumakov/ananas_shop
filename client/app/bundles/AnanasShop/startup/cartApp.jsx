import React from 'react';
import { Provider } from 'react-redux';

import CartContainer from '../containers/CartContainer';

// See documentation for https://github.com/reactjs/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.
export default (props) => {
  const { cartId } = props;
  const cartStore = ReactOnRails.getStore("cartStore");
  const reactComponent = (
    <Provider store={cartStore}>
      <CartContainer {...{ cartId }}/>
    </Provider>
  );
  return reactComponent;
};
