import Immutable from 'immutable';

import actionTypes from '../constants/adminConstants';

export const $$initialState = Immutable.fromJS({
  productLoading: true,
  order: {},
  ordersStatuses: [],
  ordersStatus: {
    title: '',
    color: ''
  },
  product: {},
  productErrors: {},
  categories: [],
  fields: [],
  field: { title: '' },
  fieldsValue: { title: ''},
  bannerItems: [],
  products: [],
  filters: []
});

export default function adminReducer($$state = $$initialState, action) {
  const {
    products, filters, filter,
    type, order, product, loading,
    errors, categories, fields, field,
    fieldsValue, bannerItems, ordersStatuses, ordersStatus
  } = action;

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

    case actionTypes.SET_ORDERS_STATUSES:
      return $$state.set('ordersStatuses', ordersStatuses);

    case actionTypes.SET_ORDERS_STATUS:
      return $$state.set('ordersStatus', ordersStatus);

    case actionTypes.SET_PRODUCTS:
      return $$state.set('products', products);

    case actionTypes.SET_FILTERS:
      return $$state.set('filters', filters);

    case actionTypes.SET_FILTER:
      let newFilters = $$state.get('filters');
      $$state.get('filters').forEach((fltr, index, filters) => {
        if( filter.get('name') === fltr.get('name')) {
          newFilters = filters.set(index, filter);
        }
      });
      return $$state.set('filters', newFilters);

    default:
      return $$state;
  }
}
