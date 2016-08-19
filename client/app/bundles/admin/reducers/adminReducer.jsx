import Immutable from 'immutable';

import actionTypes from '../constants/adminConstants';

export const $$initialState = Immutable.fromJS({
  productLoading: true,
  order: {},
  product: {},
  productErrors: {},
  categories: [],
  fields: [],
  field: { title: '' },
  fieldsValue: { title: ''},
  bannerItems: []
});

export default function adminReducer($$state = $$initialState, action) {
  const { type, order, product, loading, errors, categories, fields, field, fieldsValue, bannerItems } = action;

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

    case actionTypes.SET_FIELD:
      return $$state.set('field', field);

    case actionTypes.SET_FIELDS_VALUE:
      return $$state.set('fieldsValue', fieldsValue);

    case actionTypes.SET_BANNERS:
      return $$state.set('bannerItems', bannerItems);

    case actionTypes.SET_ORDER:
      return $$state.set('order', order);
    default:
      return $$state;
  }
}
