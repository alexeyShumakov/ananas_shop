import Immutable from 'immutable';

import actionTypes from '../constants/cartConstants';

export const $$initialState = Immutable.fromJS({
  count: 0,
  selectedProductId: 0
});

export default function cartReducer($$state = $$initialState, action) {
  const { type, cart, productId } = action;

  switch (type) {
    case actionTypes.UPDATE_CART:
      return $$state.set('cart', cart);

    case actionTypes.SET_SELECTED:
      return $$state.set('selectedProductId', productId)

    case actionTypes.RESET_SELECTED:
      return $$state.set('selectedProductId', 0)

    default:
      return $$state;
  }
}
