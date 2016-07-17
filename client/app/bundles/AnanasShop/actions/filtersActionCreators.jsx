import ReactOnRails from 'react-on-rails';
import { browserHistory } from 'react-router';
import Immutable from 'immutable';
import _ from 'lodash';

import axios from '../utils/axios';
import actionTypes from '../constants/filtersConstants';

export function setFilter(filter) {
  return {
    type: actionTypes.SET_FILTER,
    filter
  }
}

export function updateFilter(filter) {
  return function(dispatch) {
    dispatch(setFilter(filter));
    if( filter.get('name') === 'page') {
      dispatch(fetchData(null, false));
    } else {
      dispatch(fetchData());
    }
  }
}

export function fetchData(query, resetPage = true) {
  if (_.isEmpty(query)) {
    query = getParams(resetPage);
    if (resetPage) { delete query['page'] }
    let pathname = window.location.pathname;
    browserHistory.push({pathname, query});
  }
  return function(dispatch) {
    dispatch(fetchFilters(query));
    dispatch(fetchProducts(query));
  }
}

function getParams() {
  let params = {};
  const filters = ReactOnRails.getStore("cartStore")
  .getState().$$filtersStore.get('filters');
  filters.forEach((filter) => {
    let tempParams = filter.get('params');
    let name = filter.get('name');
    if(!tempParams.isEmpty()) {
      params[name] = tempParams.join(';');
    }
  });
  return params;
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

