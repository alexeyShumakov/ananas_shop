import Immutable from 'immutable';

import actionTypes from '../constants/adminConstants';

export const $$initialState = Immutable.fromJS({
  productLoading: true,
  product: {},
  productErrors: {}
});

export default function adminReducer($$state = $$initialState, action) {
  const { type, product, loading, errors } = action;

  switch (type) {
    case(actionTypes.SET_PRODUCT):
      return $$state.set('product', product);

    case(actionTypes.SET_PRODUCT_LOADING):
      return $$state.set('productLoading', loading);

    case(actionTypes.SET_PRODUCT_ERRORS):
      return $$state.set('productErrors', errors);

    default:
      return $$state;
  }
}
