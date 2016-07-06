import actionTypes from '../constants/filtersConstants';
import Immutable from 'immutable';
import axios from '../utils/axios';

export function setPriceFilter(price) {
  return {
    type: actionTypes.SET_PRICE_FILTER,
    price
  }
}

export function setCategoryId(categoryId) {
  return {
    type: actionTypes.SET_CATEGORY_ID,
    categoryId
  }
}

export function setFilters(filters) {
  return {
    type: actionTypes.SET_FILTERS,
    filters
  }
}

export function setFiltersLoading(loadingState) {
  return {
    type: actionTypes.SET_FILTERS_LOADING,
    loadingState

  }
}

export function fetchFilters(params) {
  return function(dispatch) {
    dispatch(setFiltersLoading(true));
    return axios.get('/api/v1/filters', { params: params }).then(
      (responce) => {
        let filters = Immutable.fromJS(responce.data.filters);
        dispatch(setFilters(filters));
        dispatch(setFiltersLoading(false));
      }
    )
  };
}

export function setProducts(products) {
  return {
    type: actionTypes.SET_PRODUCTS,
    products
  }
}

export function setShowcaseLoading(loadingState) {
  return {
    type: actionTypes.SET_SHOWCASE_LOADING,
    loadingState

  }
}

export function fetchProducts(params) {
  return function(dispatch) {
    dispatch(setShowcaseLoading(true));
    return axios.get('/api/v1/products', { params: params }).then(
      (responce) => {
        let products = Immutable.fromJS(responce.data.products);
        dispatch(setProducts(products));
        dispatch(setShowcaseLoading(false));
      }
    )
  };
}
