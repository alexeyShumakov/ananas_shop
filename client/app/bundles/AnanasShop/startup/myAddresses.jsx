import React from 'react';
import { Provider } from 'react-redux';
import MyAddressesContainer from '../containers/MyAddressesContainer';

export default (props) => {
  const cartStore = ReactOnRails.getStore("cartStore");
  const reactComponent = (
    <Provider store={cartStore}>
      <MyAddressesContainer/>
    </Provider>
  );
  return reactComponent;
};
