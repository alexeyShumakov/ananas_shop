import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import sinon from 'sinon';

import * as actions from '../../app/bundles/AnanasShop/actions/cartActionCreators';
import actionTypes from '../../app/bundles/AnanasShop/constants/cartConstants';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('cart actions', () => {
  describe('async', () => {
    let id = 1;
    let server;
    beforeEach(() => {
      server = sinon.fakeServer.create();
      server.autoRespond = true;
    });

    afterEach(() => {
      server.restore();
    })

    it('#fetchCart', () => {
      server.respondWith(
        [200, { "Content-Type": "application/json" }, JSON.stringify({cart: 'cart'})]
      );

      const expectedActions = [
        { type: actionTypes.SET_CART_LOADING_STATE, loadingState: true },
        { type: actionTypes.SET_CART, cart: 'cart' },
        { type: actionTypes.SET_CART_LOADING_STATE, loadingState: false},
      ]
      const store = mockStore({ cart: '' });

      return store.dispatch(actions.fetchCart(id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });

    it('#addToCart', () => {
      server.respondWith(
        [200, { "Content-Type": "application/json" }, JSON.stringify({cart: 'cart'})]
      );

      const expectedActions = [
        { type: actionTypes.RESET_SELECTED },
        { type: actionTypes.SET_SELECTED, productId: id},
        { type: actionTypes.SET_CART, cart: 'cart' }
      ];
      const store = mockStore({ cart: '' });

      return store.dispatch(actions.addToCart(id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('#updateLineItem', () => {
      server.respondWith(
        [200, { "Content-Type": "application/json" }, JSON.stringify({cart: 'cart'})]
      );

      const expectedActions = [ { type: actionTypes.SET_CART, cart: 'cart' } ];
      const store = mockStore({ cart: '' });
      return store.dispatch(actions.updateLineItem(id, 2))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('#destroyLineItem', () => {
      server.respondWith(
        [200, { "Content-Type": "application/json" }, JSON.stringify({cart: 'cart'})]
      );

      const expectedActions = [ { type: actionTypes.SET_CART, cart: 'cart' } ];
      const store = mockStore({ cart: '' });
      return store.dispatch(actions.destroyLineItem(id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  });

  describe('sync', () => {
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
});
