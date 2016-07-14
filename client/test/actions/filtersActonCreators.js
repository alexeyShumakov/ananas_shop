import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import sinon from 'sinon';

import * as actions from '../../app/bundles/AnanasShop/actions/filtersActionCreators';
import actionTypes from '../../app/bundles/AnanasShop/constants/filtersConstants';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('filters actions', () => {
  describe('async', () => {
    const params = {};
    let server;
    beforeEach(() => {
      server = sinon.fakeServer.create();
      server.autoRespond = true;
    });

    afterEach(() => {
      server.restore();
    })

    it('#fetchFilters', () => {
      server.respondWith(
        [200, { "Content-Type": "application/json" }, JSON.stringify({filters: 'filters'})]
      );

      const expectedActions = [
        { type: actionTypes.SET_FILTERS_LOADING, loadingState: true },
        { type: actionTypes.SET_FILTERS, filters: 'filters' },
        { type: actionTypes.SET_FILTERS_LOADING, loadingState: false },
      ]
      let store = mockStore({ cart: '' });

      return store.dispatch(actions.fetchFilters(params))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });

    it('#fetchProducts', () => {
      server.respondWith(
        [200, { "Content-Type": "application/json" }, JSON.stringify({products: 'products'})]
      );

      const expectedActions = [
        { type: actionTypes.SET_SHOWCASE_LOADING, loadingState: true },
        { type: actionTypes.SET_PRODUCTS, products: 'products' },
        { type: actionTypes.SET_SHOWCASE_LOADING, loadingState: false },
      ]
      let store = mockStore({ cart: '' });

      return store.dispatch(actions.fetchProducts(params))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });

  });

  describe('sync', () => {

    it('#setFilters', () => {
      let filters = { foo: 'bar' }
      const action = {
        type: actionTypes.SET_FILTERS,
        filters
      };
      expect(actions.setFilters(filters)).toEqual(action);
    });

    it('#setProducts', () => {
      let products = { foo: 'bar' }
      const action = {
        type: actionTypes.SET_PRODUCTS,
        products
      };
      expect(actions.setProducts(products)).toEqual(action);
    });

    it('#setShowcaseLoading', () => {
      let loadingState = true;
      const action = {
        type: actionTypes.SET_SHOWCASE_LOADING,
        loadingState
      };
      expect(actions.setShowcaseLoading(loadingState)).toEqual(action);
    });
  });
});
