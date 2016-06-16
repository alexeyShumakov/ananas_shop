import React from 'react';
import { Provider } from 'react-redux';

import AddToContainer from '../containers/AddToContainer';

export default (props) => {
  const cartStore = ReactOnRails.getStore("cartStore");
  const reactComponent = (
    <Provider store={cartStore}>
      <AddToContainer productId={props.product_id} />
    </Provider>
  );
  return reactComponent;
};
