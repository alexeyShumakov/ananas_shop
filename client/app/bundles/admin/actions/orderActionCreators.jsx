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
    return axios.post(`/api/v1/line_items`, {line_item});
  };
}
