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

export function setProfile(profile) {
  return {
    type: actionTypes.SET_PROFILE,
    profile
  }
}

export function fetchProfile() {
  return dispatch => {
    return axios.get(`/api/v1/users/my_profile`).then(
      responce => {
        let profile = Immutable.fromJS(responce.data.profile);
        dispatch(setProfile(profile));
        return profile;
      }, error => {
        return null;
      });
  };
}

export function updateProfile(profile) {
  return dispatch => {
    return axios.put(`/api/v1/users/my_profile`, {user: profile}).then(
      responce => {
        let profile = Immutable.fromJS(responce.data.profile);
        dispatch(setProfile(profile));
        return true;
      });
  };
}

export function setAddress(address) {
  return {
    type: actionTypes.SET_ADDRESS,
    address
  }
}

export function createAddress(address) {
  return dispatch => {
    return axios.post('/api/v1/addresses', {address});
  }
}

export function updateAddress(id, address) {
  return dispatch => {
    return axios.put(`/api/v1/addresses/${id}`, {address});
  }
}

export function destroyAddress(id) {
  return dispatch => {
    return axios.delete(`/api/v1/addresses/${id}`);
  }
}

export function setOrder(order) {
  return {
    type: actionTypes.SET_ORDER,
    order
  }
}
export function createOrder(order) {
  return dispatch => {
    return axios.post('/api/v1/orders', {order});
  }
}

export function fetchLastSeen() {
  return dispatch => {
    return axios.get('/api/v1/products/last_seen');
  }
}

export function fetchCategoriesRoots() {
  return dispatch => {
    return axios.get('/api/v1/categories', {params: {roots: true}});
  }
}
