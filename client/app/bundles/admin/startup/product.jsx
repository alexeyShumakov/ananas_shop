import React from 'react';
import { Provider } from 'react-redux';
import ProductContainer from '../containers/ProductContainer';

export default (props) => {
  const store = ReactOnRails.getStore("adminStore");
  const reactComponent = (
    <Provider store={store}>
      <ProductContainer/>
    </Provider>
  );
  return reactComponent;
};
