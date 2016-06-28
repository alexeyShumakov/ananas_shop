import React from 'react';
import { Provider } from 'react-redux';
import FullCartContainer from '../containers/FullCartContainer';

export default (props) => {
  const cartStore = ReactOnRails.getStore("cartStore");
  const reactComponent = (
    <Provider store={cartStore}>
      <FullCartContainer/>
    </Provider>
  );
  return reactComponent;
};
