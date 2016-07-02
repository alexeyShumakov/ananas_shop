import expect from 'expect'

import * as actions from '../../app/bundles/AnanasShop/actions/cartActionCreators';
import actionTypes from '../../app/bundles/AnanasShop/constants/cartConstants';

describe('sync actions', () => {
  it('should return set selected action', () => {
    const id = 42;
    const action = {
      type: actionTypes.SET_SELECTED,
      productId: id
    };
    expect(actions.setSelected(id)).toEqual(action);
  });

  it('should retrun reset selecte action', () => {
    const action = {
      type: actionTypes.RESET_SELECTED
    }
    expect(actions.resetSelected()).toEqual(action);
  });

  it('should return set cart action', () => {
    const cart = {count: 2};
    const action = {
      type: actionTypes.SET_CART,
      cart: cart
    };
    expect(actions.setCart(cart)).toEqual(action);
  });

  it('should return set cart loading state acition', () => {
    const value = true;
    const action = {
      type: actionTypes.SET_CART_LOADING_STATE,
      loadingState: value
    }
    expect(actions.setCartLoadingState(value)).toEqual(action);
  })
});
