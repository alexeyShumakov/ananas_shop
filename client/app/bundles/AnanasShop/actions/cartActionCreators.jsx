import actionTypes from '../constants/cartConstants';
import Immutable from 'immutable';

export function updateCart(cart) {
  return {
    type: actionTypes.UPDATE_CART,
    cart
  };
}

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

export function addToCart(productId) {
  return function(dispatch) {
    dispatch(resetSelected());
    return $.post('/api/v1/line_items', {product_id: productId}).then(
      (data) => {
        let cart = Immutable.fromJS(data.cart);
        dispatch(setSelected(productId));
        dispatch(updateCart(cart));
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
        dispatch(updateCart(cart));
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
        dispatch(updateCart(cart));
      }
    )
  };
}
