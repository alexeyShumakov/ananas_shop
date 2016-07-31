import Immutable from 'immutable';

import actionTypes from '../constants/adminConstants';

export const $$initialState = Immutable.fromJS({
  productLoading: true,
  product: {},
  productErrors: {},
  categories: [],
  fields: []
});

export default function adminReducer($$state = $$initialState, action) {
  const { type, product, loading, errors, categories, fields } = action;

  switch (type) {
    case(actionTypes.SET_PRODUCT):
      return $$state.set('product', product);

    case(actionTypes.SET_PRODUCT_LOADING):
      return $$state.set('productLoading', loading);

    case(actionTypes.SET_PRODUCT_ERRORS):
      return $$state.set('productErrors', errors);

    case actionTypes.SET_CATEGORIES:
      return $$state.set('categories', categories);

    case actionTypes.SET_FIELDS:
      return $$state.set('fields', fields);
    default:
      return $$state;
  }
}
