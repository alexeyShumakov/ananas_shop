import React from 'react';
import { Provider } from 'react-redux';
import CategoriesMenuContainer from '../containers/CategoriesMenuContainer';

export default (props) => {
  const cartStore = ReactOnRails.getStore("cartStore");
  const reactComponent = (
    <Provider store={cartStore}>
      <CategoriesMenuContainer/>
    </Provider>
  );
  return reactComponent;
};
