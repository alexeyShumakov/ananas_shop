import React from 'react';
import { Provider } from 'react-redux';
import MyOrdersContainer from '../containers/MyOrdersContainer';

export default (props) => {
  const cartStore = ReactOnRails.getStore("cartStore");
  const reactComponent = (
    <Provider store={cartStore}>
      <MyOrdersContainer/>
    </Provider>
  );
  return reactComponent;
};
