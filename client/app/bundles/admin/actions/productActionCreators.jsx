import Immutable from 'immutable';

import actionTypes from '../constants/adminConstants';
import axios from '../utils/axios';

export function setProduct(product) {
  return {
    type: actionTypes.SET_PRODUCT,
    product
  }
}
export function setProductLoading(loading) {
  return {
    type: actionTypes.SET_PRODUCT_LOADING,
    loading
  }
}

export function fetchProduct(id) {
  return dispatch => {
    dispatch(setProductLoading(true));
    return axios.get(`/api/v1/products/${id}`).then(
      responce => {
        let product = Immutable.fromJS(responce.data.product);
        dispatch(setProduct(product));
        dispatch(setProductLoading(false));
      });
  };
}

export function createPicture(picture) {
  return dispatch => {
    return axios.post(`/api/v1/pictures`, picture).then(
      responce => {
        let product = Immutable.fromJS(responce.data.product);
        dispatch(setProduct(product));
      });
  };
}

export function updatePicture(id, picture) {
  return dispatch => {
    return axios.put(`/api/v1/pictures/${id}`, picture).then(
      responce => {
        let product = Immutable.fromJS(responce.data.product);
        dispatch(setProduct(product));
      });
  };
}

export function deletePicture(id) {
  return dispatch => {
    return axios.delete(`/api/v1/pictures/${id}`).then(
      responce => {
        let product = Immutable.fromJS(responce.data.product);
        dispatch(setProduct(product));
      });
  };
}
