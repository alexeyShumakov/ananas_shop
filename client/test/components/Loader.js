import expect from 'expect'
import React from 'react'
import { shallow } from 'enzyme';

import Loader from '../../app/bundles/AnanasShop/components/Loader'

describe('component', () => {
  describe('Loader', () => {
    it('should render correctly', () => {
      const wrapper = shallow(<Loader/>);
      expect(wrapper.hasClass('cssload-overlay')).toBe(true);
    })
    it('should render 3 div`s', () => {
      const wrapper = shallow(<Loader/>);
      expect(wrapper.find('div').length).toEqual(3);
    })
  })
})
