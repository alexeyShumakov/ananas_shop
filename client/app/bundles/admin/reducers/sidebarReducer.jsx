import Immutable from 'immutable';

import actionTypes from '../constants/sidebarConstants';

export const $$initialState = Immutable.fromJS({
  product: {
    title: 'Product',
    price: 1,
    category: '',
  },
  categories: []
});

export default function cartReducer($$state = $$initialState, action) {
  const { type, product } = action;

  switch (type) {
    case actionTypes.SET_PRODUCT:
      return $$state.set('product', product);

    default:
      return $$state;
  }
}
