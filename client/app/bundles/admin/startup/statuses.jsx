import React from 'react';
import { Provider } from 'react-redux';
import StatusesContainer from '../containers/StatusesContainer';

export default (props) => {
  const store = ReactOnRails.getStore("adminStore");
  const reactComponent = (
    <Provider store={store}>
      <StatusesContainer/>
    </Provider>
  );
  return reactComponent;
};
