import React from 'react';
import { Provider } from 'react-redux';
import FullProductContainer from '../containers/FullProductContainer';

export default (props) => {
  const cartStore = ReactOnRails.getStore("cartStore");
  const reactComponent = (
    <Provider store={cartStore}>
      <FullProductContainer productId={props.id}/>
    </Provider>
  );
  return reactComponent;
};
