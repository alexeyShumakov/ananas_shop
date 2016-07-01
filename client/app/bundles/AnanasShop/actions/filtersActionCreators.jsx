import actionTypes from '../constants/filtersConstants';
import Immutable from 'immutable';

export function setPriceFilter(params) {
  return {
    type: actionTypes.SET_PRICE_FILTER,
    price: params
  }
}

export function setCategoryId(id) {
  return {
    type: actionTypes.SET_CATEGORY_ID,
    categoryId: id
  }
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
