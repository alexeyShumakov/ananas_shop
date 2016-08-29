import React from 'react';
import { Provider } from 'react-redux';
import UserContainer from '../containers/UserContainer';

export default (props) => {
  const store = ReactOnRails.getStore("adminStore");
  const reactComponent = (
    <Provider store={store}>
      <UserContainer id={props.id}/>
    </Provider>
  );
  return reactComponent;
};
