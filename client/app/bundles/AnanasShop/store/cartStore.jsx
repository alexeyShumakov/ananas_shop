import { compose, createStore, applyMiddleware, combineReducers } from 'redux';

import thunkMiddleware from 'redux-thunk';

import loggerMiddleware from 'lib/middlewares/loggerMiddleware';

import reducers from '../reducers';
import { initialStates } from '../reducers';

export default props => {
  const { totalPrice, totalCount } = props;
  const { $$cartState, $$filtersState } = initialStates;

  const initialState = {
    $$filtersStore: $$filtersState,
    $$cartStore: $$cartState.merge({
      cart: {
        total_price: totalPrice,
        total_count: totalCount
      }
    })
  };

  const reducer = combineReducers(reducers);
  const composedStore = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );
  const storeCreator = composedStore(createStore);
  const store = storeCreator(reducer, initialState);

  return store;
};
