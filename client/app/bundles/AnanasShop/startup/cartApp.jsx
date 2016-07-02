import React from 'react';
import { Provider } from 'react-redux';

import CartContainer from '../containers/CartContainer';

export default (props) => {
  const { cartId } = props;
  const cartStore = ReactOnRails.getStore("cartStore");
  return(
    <Provider store={cartStore}>
      <CartContainer {...{ cartId }}/>
    </Provider>
  );
};
