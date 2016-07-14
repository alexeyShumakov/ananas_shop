import expect from 'expect'
import React from 'react'
import { shallow, mount } from 'enzyme';
import Immutable from 'immutable';

import Filters from '../../app/bundles/AnanasShop/components/Filters'
import PriceFilter from '../../app/bundles/AnanasShop/components/filters/PriceFilter'

describe('component', () => {
  describe('Filters', () => {
    let params, router;
    beforeEach( () => {
      router = { push: expect.createSpy() };
      params = {
        fetchData: expect.createSpy(),
        setFilter: expect.createSpy(),
        updateFilter: expect.createSpy(),
        query: {},
        params: {},
        filters: Immutable.fromJS([
          {type: 'PriceFilter', name: 'price', params: []},
          {type: 'CategoryFilter', name: 'category', params: []},
        ])
      }
    })

    it('should render correctly', () => {
      const wrapper = shallow(<Filters {...params }/>, { context: { router }});
      expect(wrapper.hasClass('filters')).toBeTruthy();
    })

    it('should fetchData', () => {
      const wrapper = shallow(<Filters {...params }/>, { context: { router }});
      expect(params.fetchData.calls.length).toEqual(1);
    })

    it('should render Filters', () => {
      const wrapper = shallow(<Filters {...params }/>, { context: { router }});
      expect(wrapper.find('PriceFilter').length).toEqual(1);
      expect(wrapper.find('CategoryFilter').length).toEqual(1);
    })
  })
})
