import expect from 'expect'
import Immutable from 'immutable'
import reducer from '../../app/bundles/AnanasShop/reducers/cartReducer'
import actionTypes from '../../app/bundles/AnanasShop/constants/cartConstants'

let initialState = Immutable.fromJS({
  count: 0,
  isCartLoading: true,
  selectedProductId: 0,
  cart: {
    id: 0,
    total_count: 0,
    total_price: '0.00',
    line_items: [{
        count: 0,
        product: {
          price: '0.00',
          title: '',
          thumb_cover_url: ''
        }
      }
    ]
  }
});

describe('cart reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  })

  it('should set cartLoadingState', () => {
    expect(reducer( initialState, {
      type: actionTypes.SET_CART_LOADING_STATE,
      loadingState: false
    })).toEqual(initialState.set('isCartLoading', false))
  })

  it('should set cart', () => {
    let cart = Immutable.fromJS({
      cart: { total_count: 15 }
    })
    expect(reducer( initialState, {
      type: actionTypes.SET_CART,
      cart
    })).toEqual(initialState.set('cart', cart ))
  })

  it('should set selectedProductId', () => {
    expect(reducer( initialState, {
      type: actionTypes.SET_SELECTED,
      productId: 15
    })).toEqual(initialState.set('selectedProductId', 15))
  })

  it('should reset selectedProductId', () => {
    let state = initialState.set('selectedProductId', 15)
    expect(reducer( state, {
      type: actionTypes.RESET_SELECTED,
    })).toEqual(initialState.set('selectedProductId', 0))
  })
})
