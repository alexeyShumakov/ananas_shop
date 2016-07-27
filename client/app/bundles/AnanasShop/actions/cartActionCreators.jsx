import actionTypes from '../constants/cartConstants';
import Immutable from 'immutable';
import axios from '../utils/axios';

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
    return axios.get(`/api/v1/carts/${id}`).then(
      responce => {
        let cart = Immutable.fromJS(responce.data.cart);
        dispatch(setCart(cart));
        dispatch(setCartLoadingState(false));
      });
  };
}

export function addToCart(id) {
  return dispatch => {
    dispatch(resetSelected());
    return axios.post('/api/v1/line_items', {product_id: id}).then(
      (responce) => {
        let cart = Immutable.fromJS(responce.data.cart);
        dispatch(setSelected(id));
        dispatch(setCart(cart));
      }
    );
  };
}
export function updateLineItem(id, count) {
  return dispatch => {
    return axios.put(`/api/v1/line_items/${id}`, { count: count }).then(
      (responce) => {
        let cart = Immutable.fromJS(responce.data.cart);
        dispatch(setCart(cart));
      }
    )
  };
}

export function destroyLineItem(id) {
  return dispatch => {
    return axios.delete(`/api/v1/line_items/${id}`).then(
      (responce) => {
        let cart = Immutable.fromJS(responce.data.cart);
        dispatch(setCart(cart));
      }
    )
  };
}


export function setProduct(product) {
  return {
    type: actionTypes.SET_PRODUCT,
    product
  }
}

export function fetchProduct(id) {
  return dispatch => {
    return axios.get(`/api/v1/products/${id}`).then(
      responce => {
        let product = Immutable.fromJS(responce.data.product);
        dispatch(setProduct(product));
        return true;
      });
  };
}
