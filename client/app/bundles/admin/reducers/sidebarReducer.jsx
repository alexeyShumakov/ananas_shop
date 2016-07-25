import Immutable from 'immutable';

import actionTypes from '../constants/sidebarConstants';

export const $$initialState = Immutable.fromJS({
  product: {
    title: 'Product',
    price: 1,
    category_id: '',
  },
  productErrors: {},
  categories: []
});

export default function sidebarReducer($$state = $$initialState, action) {
  const { type, product, categories, productErrors } = action;

  switch (type) {
    case actionTypes.SET_PRODUCT:
      return $$state.set('product', product);

    case actionTypes.SET_PRODUCT_ERRORS:
      return $$state.set('productErrors', productErrors);

    case actionTypes.SET_CATEGORIES:
      return $$state.set('categories', categories);

    default:
      return $$state;
  }
}
