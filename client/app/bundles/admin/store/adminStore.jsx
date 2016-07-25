import { compose, createStore, applyMiddleware, combineReducers } from 'redux';

import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'lib/middlewares/loggerMiddleware';

import reducers from '../reducers';
import { initialStates } from '../reducers';

export default props => {
  const { $$sidebarState, $$adminState } = initialStates;
  const initialState = {
    $$sidebarStore: $$sidebarState,
    $$adminStore: $$adminState
  };

  const reducer = combineReducers(reducers);
  const composedStore = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );

  const storeCreator = composedStore(createStore);
  const store = storeCreator(reducer, initialState);

  return store;
};
