import React from 'react';
import { Provider } from 'react-redux';
import Showcase from '../containers/IndexPageProudctsContainer';

export default (props) => {
  const cartStore = ReactOnRails.getStore("cartStore");
  const reactComponent = (
    <Provider store={cartStore}>
      <Showcase/>
    </Provider>
  );
  return reactComponent;
};
