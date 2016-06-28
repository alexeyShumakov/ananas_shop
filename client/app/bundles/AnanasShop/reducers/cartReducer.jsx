import Immutable from 'immutable';

import actionTypes from '../constants/cartConstants';

export const $$initialState = Immutable.fromJS({
  count: 0,
  isCartLoading: true,
  selectedProductId: 0,
  cartId: 0,
  cart: {
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
  },
  showcaseLoading: true,
  products: []
});

export default function cartReducer($$state = $$initialState, action) {
  const { loadingState, type, cart, productId, products } = action;

  switch (type) {
    case actionTypes.SET_CART_LOADING_STATE:
      return $$state.set('isCartLoading', loadingState);

    case actionTypes.SET_CART:
      return $$state.set('cart', cart);

    case actionTypes.SET_SELECTED:
      return $$state.set('selectedProductId', productId);

    case actionTypes.RESET_SELECTED:
      return $$state.set('selectedProductId', 0);

    case actionTypes.SET_PRODUCTS:
      return $$state.set('products', products);

    case actionTypes.SET_SHOWCASE_LOADING:
      return $$state.set('showcaseLoading', loadingState);

    default:
      return $$state;
  }
}
