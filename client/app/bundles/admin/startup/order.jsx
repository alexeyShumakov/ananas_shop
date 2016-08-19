import React from 'react';
import { Provider } from 'react-redux';
import OrderContainer from '../containers/OrderContainer';

export default (props) => {
  const store = ReactOnRails.getStore("adminStore");
  const reactComponent = (
    <Provider store={store}>
      <OrderContainer id={props.id}/>
    </Provider>
  );
  return reactComponent;
};
