import Immutable from 'immutable';

import actionTypes from '../constants/sidebarConstants';
import axios from '../utils/axios';

export function setProduct(product) {
  return {
    type: actionTypes.SET_PRODUCT,
    product
  }
}

export function setProductErrors(productErrors) {
  return {
    type: actionTypes.SET_PRODUCT_ERRORS,
    productErrors
  }
}

export function createProduct(product) {
  return dispatch => {
    return axios.post('/api/v1/products', {product: product}).then(
      responce => {
        window.location = `/admin/products/${responce.data.product.id}`;
      }, errors => {
        let productErrors = Immutable.fromJS(errors.data);
        dispatch(setProductErrors(productErrors));
      });
  };
}

export function setCategories(categories) {
  return {
    type: actionTypes.SET_CATEGORIES,
    categories
  }
}

export function fetchCategories() {
  return dispatch => {
    return axios.get('/api/v1/categories').then(
      responce => {
        let categories = Immutable.fromJS(responce.data.categories);
        dispatch(setCategories(categories));
      });
  };
}
