import expect from 'expect'
import React from 'react'
import { shallow, mount } from 'enzyme';
import Immutable from 'immutable';

import Filters from '../../app/bundles/AnanasShop/components/Filters'
import PriceFilter from '../../app/bundles/AnanasShop/components/filters/PriceFilter'

describe('component', () => {
  describe('Filters', () => {
    let params;
    beforeEach( () => {
      params = {
        categoryId: null,
        query: {},
        priceFilter: Immutable.fromJS({
          price: { min: 0, max: 100, minB: 0, maxB: 100 }
        }),
        fetchProducts: expect.createSpy(),
        fetchFilters: expect.createSpy(),
        router: { push: expect.createSpy() },
        setPriceFilter: expect.createSpy()
      }
    })
    it('should render correctly', () => {
      let { categoryId, query, priceFilter,
      fetchProducts, fetchFilters, router, setPriceFilter } = params;
      const wrapper = shallow(<Filters {...{
        categoryId,
        priceFilter,
        query,
        fetchProducts,
        fetchFilters,
        setPriceFilter }}/>, {context: {router: router}});
      expect(wrapper.hasClass('filters')).toBeTruthy();
      expect(wrapper.find('PriceFilter').length).toEqual(1);
    })

    it('should calls fetchProducts, fetchFilters on init', () => {
      let { categoryId, query, priceFilter,
      fetchProducts, fetchFilters, router, setPriceFilter } = params;
      const wrapper = shallow(<Filters {...{
        categoryId,
        priceFilter,
        query,
        fetchProducts,
        fetchFilters,
        setPriceFilter }}/>, {context: {router: router}});
      expect(fetchProducts.calls.length).toEqual(1);
      expect(fetchFilters.calls.length).toEqual(1);
    })
  })
})
