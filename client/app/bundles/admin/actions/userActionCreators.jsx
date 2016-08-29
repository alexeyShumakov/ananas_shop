import Immutable from 'immutable';

import actionTypes from '../constants/adminConstants';
import axios from '../utils/axios';

export function setUser(user) {
  return {
    type: actionTypes.SET_USER,
    user
  }
}

export function fetchUser(id) {
  return dispatch => {
    return axios.get(`/api/v1/users/${id}`).then(
      responce => {
        let user = Immutable.fromJS(responce.data.user);
        dispatch(setUser(user));
      });
  };
}

export function updateUser(user) {
  return dispatch => {
    let id = user.get('id');
    return axios.patch(`/api/v1/users/${id}`, {user}).then(
      responce => {
        let user = Immutable.fromJS(responce.data.user);
        dispatch(setUser(user));
      });
  }
}

export function fetchUsersRoles() {
  return dispatch => {
    return axios.get(`/api/v1/users/roles`);
  }
}
