import React from 'react';
import { Provider } from 'react-redux';
import BannerItemsContainer from '../containers/BannerItemsContainer';

export default (props) => {
  const store = ReactOnRails.getStore("adminStore");
  const reactComponent = (
    <Provider store={store}>
      <BannerItemsContainer id={props.id}/>
    </Provider>
  );
  return reactComponent;
};
