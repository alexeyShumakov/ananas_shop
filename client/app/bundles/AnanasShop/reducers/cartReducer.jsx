import Immutable from 'immutable';

import actionTypes from '../constants/cartConstants';

export const $$initialState = Immutable.fromJS({
  count: 0,
  isCartLoading: true,
  selectedProductId: 0,
  address: {
    city: '',
    address: '',
    current: true
  },
  profile: {
  },
  product: {},
  cart: {
    id: 0,
    total_count: 0,
    total_price: '0.00',
    line_items: [{
        count: 0,
        product: {
          price: '0.00',
          title: '',
          thumb_cover_url: ''
        }
      }
    ]
  }
});

export default function cartReducer($$state = $$initialState, action) {
  const { loadingState, cart, address, productId, product, profile, type } = action;

  switch (type) {
    case actionTypes.SET_CART_LOADING_STATE:
      return $$state.set('isCartLoading', loadingState);

    case actionTypes.SET_CART:
      return $$state.set('cart', cart);

    case actionTypes.SET_SELECTED:
      return $$state.set('selectedProductId', productId);

    case actionTypes.RESET_SELECTED:
      return $$state.set('selectedProductId', 0);

    case actionTypes.SET_PRODUCT:
      return $$state.set('product', product);

    case actionTypes.SET_PROFILE:
      return $$state.set('profile', profile);

    case actionTypes.SET_ADDRESS:
      return $$state.set('address', address);

    default:
      return $$state;
  }
}
