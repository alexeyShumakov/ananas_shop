import React from 'react';
import { Provider } from 'react-redux';
import MyProfileContainer from '../containers/MyProfileContainer';

export default (props) => {
  const cartStore = ReactOnRails.getStore("cartStore");
  const reactComponent = (
    <Provider store={cartStore}>
      <MyProfileContainer/>
    </Provider>
  );
  return reactComponent;
};
