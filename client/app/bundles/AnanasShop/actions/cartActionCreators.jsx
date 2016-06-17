import actionTypes from '../constants/cartConstants';
import Immutable from 'immutable';

export function setSelected(productId) {
  return {
    type: actionTypes.SET_SELECTED,
    productId: productId
  }
}

export function resetSelected(productId) {
  return {
    type: actionTypes.RESET_SELECTED
  }
}

export function setCart(cart) {
  return {
    type: actionTypes.SET_CART,
    cart
  }
}

export function fetchCart(cartId) {
  return function(dispatch) {
    return $.get(`/api/v1/carts/${cartId}`).then(
      (data) => {
        let cart = Immutable.fromJS(data.cart);
        dispatch(setCart(cart));
      }
    );
  };
}

export function addToCart(productId) {
  return function(dispatch) {
    dispatch(resetSelected());
    return $.post('/api/v1/line_items', {product_id: productId}).then(
      (data) => {
        let cart = Immutable.fromJS(data.cart);
        dispatch(setSelected(productId));
        dispatch(setCart(cart));
      }
    );
  };
}
export function updateLineItem(lineItemId, count) {
  return function(dispatch) {
    return $.ajax({
      url: `/api/v1/line_items/${lineItemId}`,
      type: 'PUT',
      data: {count: count}
    }).then(
      (data) => {
        let cart = Immutable.fromJS(data.cart);
        dispatch(setCart(cart));
      }
    )
  };
}

export function destroyLineItem(lineItemId) {
  return function(dispatch) {
    return $.ajax({
      url: `/api/v1/line_items/${lineItemId}`,
      type: 'DELETE'
    }).then(
      (data) => {
        let cart = Immutable.fromJS(data.cart);
        dispatch(setCart(cart));
      }
    )
  };
}
