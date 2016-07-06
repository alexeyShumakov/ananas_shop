import expect from 'expect'
import Immutable from 'immutable'
import reducer from '../../app/bundles/AnanasShop/reducers/filtersReducer'
import actionTypes from '../../app/bundles/AnanasShop/constants/filtersConstants'

let initialState = Immutable.fromJS({
  filtersLoading: true,
  filters: {
    categoryId: null,
    price: {
      min: 0,
      max: 100,
      minB: 0,
      maxB: 100
    }
  },
  showcaseLoading: true,
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

  it('#SET_FILTERS', () => {
    expect(reducer( initialState, {
      type: actionTypes.SET_FILTERS,
      filters: 'filters'
    })).toEqual(initialState.set('filters', 'filters'))
  })

  it('#SET_PRICE_FILTER', () => {
    let price = {min: 0, max: 1};
    let tmp = initialState.setIn(['filters', 'price', 'minB'], price.min );
    tmp = initialState.setIn(['filters', 'price', 'maxB'], price.max );
    expect(reducer( initialState, {
      type: actionTypes.SET_PRICE_FILTER,
      price
    })).toEqual(tmp)
  })

  it('#SET_CATEGORY_ID', () => {
    let categoryId = 42;
    expect(reducer( initialState, {
      type: actionTypes.SET_CATEGORY_ID,
      categoryId
    })).toEqual(initialState.setIn(['filters', 'categoryId'], categoryId))
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
