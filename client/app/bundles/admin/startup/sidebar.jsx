import React from 'react';
import { Provider } from 'react-redux';
import SidebarContainer from '../containers/SidebarContainer';

export default (props) => {
  const store = ReactOnRails.getStore("adminStore");
  const reactComponent = (
    <Provider store={store}>
      <SidebarContainer/>
    </Provider>
  );
  return reactComponent;
};
