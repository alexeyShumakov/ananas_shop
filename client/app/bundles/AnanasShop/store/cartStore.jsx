import { compose, createStore, applyMiddleware, combineReducers } from 'redux';

import thunkMiddleware from 'redux-thunk';

import loggerMiddleware from 'lib/middlewares/loggerMiddleware';

import reducers from '../reducers';
import { initialStates } from '../reducers';

export default props => {
  // This is how we get initial props Rails into redux.
  const { cart } = props;
  const { $$cartState } = initialStates;

  // Redux expects to initialize the store using an Object, not an Immutable.Map
  const initialState = {
    $$cartStore: $$cartState.merge({
      cart
    }),
  };

  const reducer = combineReducers(reducers);
  const composedStore = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );
  const storeCreator = composedStore(createStore);
  const store = storeCreator(reducer, initialState);

  return store;
};
