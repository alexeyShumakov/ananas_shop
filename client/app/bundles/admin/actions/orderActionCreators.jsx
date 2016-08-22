import Immutable from 'immutable';

import actionTypes from '../constants/adminConstants';
import axios from '../utils/axios';

export function setOrder(order) {
  return {
    type: actionTypes.SET_ORDER,
    order
  }
}

export function fetchOrder(id) {
  return dispatch => {
    return axios.get(`/api/v1/orders/${id}`).then(
      responce => {
        let order = Immutable.fromJS(responce.data.order);
        dispatch(setOrder(order));
      });
  };
}

export function updateOrder(id, order) {
  return dispatch => {
    return axios.patch(`/api/v1/orders/${id}`, {order});
  };
}

export function updateAddress(id, address) {
  return dispatch => {
    return axios.patch(`/api/v1/addresses/${id}`, {address});
  };
}

export function updateLineItem(id, params) {
  return dispatch => {
    return axios.patch(`/api/v1/line_items/${id}`, {count: params.count});
  };
}

export function destroyLineItem(id) {
  return dispatch => {
    return axios.delete(`/api/v1/line_items/${id}`);
  };
}

export function createLineItem(line_item) {
  return dispatch => {
    return axios.post(`/api/v1/line_items`, line_item);
  };
}


export function setOrdersStatuses(ordersStatuses) {
  return {
    type: actionTypes.SET_ORDERS_STATUSES,
    ordersStatuses
  }
}

export function fetchOrdersStatuses() {
  return dispatch => {
    return axios.get(`/api/v1/orders_statuses`).then(
      responce => {
        let statuses = Immutable.fromJS(responce.data.orders_statuses);
        dispatch(setOrdersStatuses(statuses));
      });
  };
}

export function setProducts(products) {
  return {
    type: actionTypes.SET_PRODUCTS,
    products
  }
}

export function fetchProducts(params) {
  return function(dispatch) {
    return axios.get('/api/v1/products', { params: params }).then(
      (responce) => {
        let products = Immutable.fromJS(responce.data.products);
        dispatch(setProducts(products));
      }
    )
  };
}

export function setFilters(filters) {
  return {
    type: actionTypes.SET_FILTERS,
    filters
  }
}

export function fetchFilters(params) {
  return function(dispatch) {
    return axios.get('/api/v1/filters', { params: params }).then(
      (responce) => {
        let filters = Immutable.fromJS(responce.data.filters);
        dispatch(setFilters(filters));
      }
    )
  };
}

export function fetchData(resetPage = true) {
  let query = getParams(resetPage);
  return function(dispatch) {
    dispatch(fetchFilters(query));
    dispatch(fetchProducts(query));
  }
}

export function setFilter(filter) {
  return {
    type: actionTypes.SET_FILTER,
    filter
  }
}

export function updateFilter(filter) {
  return function(dispatch) {
    dispatch(setFilter(filter));
    let resetPage = filter.get('name') !== 'page'
    dispatch(fetchData(resetPage));
  }
}

function getParams(resetPage) {
  let params = {};
  const filters = ReactOnRails.getStore("adminStore")
  .getState().$$adminStore.get('filters');
  filters.forEach((filter) => {
    let tempParams = filter.get('params');
    let name = filter.get('name');
    if(!tempParams.isEmpty()) {
      params[name] = tempParams.join(';');
    }
  });
  if (resetPage) { delete params['page'] }
  return params;
}
