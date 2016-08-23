import expect from 'expect';
import React from 'react';
import Rcslider from 'rc-slider';
import { shallow, mount } from 'enzyme';
import Immutable from 'immutable';
import { FormControl } from 'react-bootstrap';

import PriceFilter from '../../../app/bundles/AnanasShop/components/filters/PriceFilter';

describe('component', () => {
  describe('PriceFilter', () => {
    let params;
    beforeEach( () => {
      params = {
        setFilter:      expect.createSpy(),
        updateFilter:   expect.createSpy(),
        fetchData:      expect.createSpy(),
        filter: Immutable.fromJS({
          type: 'PriceFilter',
          name: 'price',
          params: [],
          min: 0, max: 100, minB: 0,
          maxB: 100, minFormB: 0, maxFormB: 100
        })
      }
    })
    it('should render Rcslider', () => {
      const wrapper = shallow(<PriceFilter {...params}/>);
      expect(wrapper.find(Rcslider).length).toEqual(1);
    })

    it('should call fetchData onAfterChange event', () => {
      const wrapper = shallow(<PriceFilter {...params}/>);
      let rcSlider = wrapper.find(Rcslider);
      rcSlider.simulate('afterChange');
      expect(params.fetchData.calls.length).toEqual(1);
    })

    it('should call setFilter then Rcslider changed', () => {
      const wrapper = shallow(<PriceFilter {...params}/>);
      let rcSlider = wrapper.find(Rcslider);
      rcSlider.simulate('change', [0, 100]);

      expect(params.setFilter.calls[0].arguments)
        .toEqual([params.filter]);
    })

    it('should call updateFilter then form is onBlur', () => {
      const wrapper = shallow(<PriceFilter {...params}/>);
      let form = wrapper.find(FormControl).first();
      form.simulate('blur');

      expect(params.updateFilter.calls.length).toEqual(1);
      expect(params.updateFilter.calls[0].arguments)
        .toEqual([params.filter.set('params', Immutable.List([0,100]))]);
    })
  })
})
