import React from 'react';
import { Provider } from 'react-redux';
import NewOrderContainer from '../containers/NewOrderContainer';

export default (props) => {
  const cartStore = ReactOnRails.getStore("cartStore");
  const reactComponent = (
    <Provider store={cartStore}>
      <NewOrderContainer/>
    </Provider>
  );
  return reactComponent;
};
