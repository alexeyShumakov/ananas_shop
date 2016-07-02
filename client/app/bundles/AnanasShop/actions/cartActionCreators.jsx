import actionTypes from '../constants/cartConstants';
import Immutable from 'immutable';

export function setSelected(productId) {
  return {
    type: actionTypes.SET_SELECTED,
    productId
  }
}

export function resetSelected() {
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

export function setCartLoadingState(loadingState) {
  return {
    type: actionTypes.SET_CART_LOADING_STATE,
    loadingState

  }
}

export function fetchCart(id) {
  return dispatch => {
    dispatch(setCartLoadingState(true));
    return $.get(`/api/v1/carts/${id}`).then(
      data => {
        let cart = Immutable.fromJS(data.cart);
        dispatch(setCart(cart));
        dispatch(setCartLoadingState(false));
      }
    );
  };
}

export function addToCart(id) {
  return dispatch => {
    dispatch(resetSelected());
    return $.post('/api/v1/line_items', {product_id: id}).then(
      (data) => {
        let cart = Immutable.fromJS(data.cart);
        dispatch(setSelected(id));
        dispatch(setCart(cart));
      }
    );
  };
}
export function updateLineItem(id, count) {
  return dispatch => {
    return $.ajax({
      url: `/api/v1/line_items/${id}`,
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

export function destroyLineItem(id) {
  return dispatch => {
    return $.ajax({
      url: `/api/v1/line_items/${id}`,
      type: 'DELETE'
    }).then(
      (data) => {
        let cart = Immutable.fromJS(data.cart);
        dispatch(setCart(cart));
      }
    )
  };
}
