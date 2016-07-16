import expect from 'expect'
import Immutable from 'immutable'
import reducer from '../../app/bundles/AnanasShop/reducers/filtersReducer'
import actionTypes from '../../app/bundles/AnanasShop/constants/filtersConstants'

let initialState = Immutable.fromJS({
  filtersLoading: true,
  showcaseLoading: true,
  filters: [],
  products: []
});

describe('filters reducer', () => {
  it('#initialState', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  })

  it('#SET_FILTERS_LOADING', () => {
    expect(reducer( initialState, {
      type: actionTypes.SET_FILTERS_LOADING,
      loadingState: false
    })).toEqual(initialState.set('filtersLoading', false))
  })

  it('#SET_FILTER', () => {
    let newFilter = Immutable.fromJS({
      type: 'PriceFilter',
      name: 'price',
      params: [],
      test: 'new test'
    });

    expect(reducer(initialState, {
      type: actionTypes.SET_FILTER,
      newFilter
    })).toEqual(initialState)
  })

  it('#SET_FILTERS', () => {
    let filters = Immutable.fromJS([{
      type: 'PriceFilter',
      name: 'price',
      params: [],
      test: 'new test'
    }]);
    expect(reducer( initialState, {
      type: actionTypes.SET_FILTERS,
      filters
    })).toEqual(initialState.set('filters', filters))
  })

  it('#SET_SHOWCASE_LOADING', () => {
    let loadingState = false;
    expect(reducer( initialState, {
      type: actionTypes.SET_SHOWCASE_LOADING,
      loadingState
    })).toEqual(initialState.set('showcaseLoading', loadingState))
  })

  it('#SET_PRODUCTS', () => {
    let products = 'products';
    expect(reducer( initialState, {
      type: actionTypes.SET_PRODUCTS,
      products
    })).toEqual(initialState.set('products', products))
  })
})
