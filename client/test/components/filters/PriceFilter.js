import expect from 'expect';
import React from 'react';
import Rcslider from 'rc-slider';
import { shallow, mount } from 'enzyme';
import Immutable from 'immutable';

import PriceFilter from '../../../app/bundles/AnanasShop/components/filters/PriceFilter';

describe('component', () => {
  describe('PriceFilter', () => {
    let params;
    beforeEach( () => {
      params = {
        priceFilter: Immutable.fromJS({
          price: { min: 0, max: 100, minB: 0, maxB: 100 }
        }),
        fetchData:      expect.createSpy(),
        setPriceFilter: expect.createSpy()
      }
    })
    it('should render Rcslider', () => {
      const wrapper = shallow(<PriceFilter {...params}/>);
      expect(wrapper.find(Rcslider).length).toEqual(1);
    })

    it('should call setPriceFilter then Rcslider changed', () => {
      const wrapper = shallow(<PriceFilter {...params}/>);
      let rcSlider = wrapper.find(Rcslider);
      rcSlider.simulate('change', [0, 1]);
      expect(params.setPriceFilter.calls.length).toEqual(1);
    })

    it('should call fetchData onAfterChange event', () => {
      const wrapper = shallow(<PriceFilter {...params}/>);
      let rcSlider = wrapper.find(Rcslider);
      rcSlider.simulate('afterChange');
      expect(params.fetchData.calls.length).toEqual(1);
    })
  })
})
