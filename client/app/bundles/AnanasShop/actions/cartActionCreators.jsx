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

export function setCartLoadingState(value) {
  return {
    type: actionTypes.SET_CART_LOADING_STATE,
    loadingState: value

  }
}

export function fetchCart(cartId) {
  return function(dispatch) {
    dispatch(setCartLoadingState(true));
    return $.get(`/api/v1/carts/${cartId}`).then(
      (data) => {
        let cart = Immutable.fromJS(data.cart);
        dispatch(setCart(cart));
        dispatch(setCartLoadingState(false));
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


export function setProducts(products) {
  return {
    type: actionTypes.SET_PRODUCTS,
    products: products
  }
}

export function setShowcaseLoading(value) {
  return {
    type: actionTypes.SET_SHOWCASE_LOADING,
    loadingState: value

  }
}

export function fetchProducts(params) {
  return function(dispatch) {
    dispatch(setShowcaseLoading(true));
    return $.get('/api/v1/products', params).then(
      (data) => {
        let products = Immutable.fromJS(data.products);
        dispatch(setProducts(products));
        dispatch(setShowcaseLoading(false));
      }
    )
  };
}

export function setFilters(filters) {
  return {
    type: actionTypes.SET_FILTERS,
    filters: filters
  }
}

export function setFiltersLoading(value) {
  return {
    type: actionTypes.SET_FILTERS_LOADING,
    loadingState: value

  }
}

export function fetchFilters(params) {
  return function(dispatch) {
    dispatch(setFiltersLoading(true));
    return $.get('/api/v1/filters', params).then(
      (data) => {
        let filters = Immutable.fromJS(data.filters);
        dispatch(setFilters(filters));
        dispatch(setFiltersLoading(false));
      }
    )
  };
}
