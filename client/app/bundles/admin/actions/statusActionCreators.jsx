import Immutable from 'immutable';

import actionTypes from '../constants/adminConstants';
import axios from '../utils/axios';

export function setOrdersStatuses(ordersStatuses) {
  return {
    type: actionTypes.SET_ORDERS_STATUSES,
    ordersStatuses
  }
}

export function setOrdersStatus(ordersStatus) {
  return {
    type: actionTypes.SET_ORDERS_STATUS,
    ordersStatus
  }
}

export function createOrdersStatus(orders_status) {
  return dispatch => {
    return axios.post(`/api/v1/orders_statuses`, {orders_status});
  };
}

export function updateOrdersStatus(orders_status) {
  return dispatch => {
    return axios.patch(`/api/v1/orders_statuses/${orders_status.get('id')}`, {orders_status});
  };
}
export function deleteOrdersStatus(id) {
  return dispatch => {
    return axios.delete(`/api/v1/orders_statuses/${id}`);
  };
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
