import expect from 'expect'
import React from 'react'
import { shallow, mount } from 'enzyme';

import AddToButton from '../../app/bundles/AnanasShop/components/AddToButton'

describe('component', () => {
  describe('AddToButton', () => {
    it('should have button and calls addToCart func on click', () => {
      let addToCart = expect.createSpy();
      let productId = 42;
      let selectedProductId = 4;
      const wrapper = shallow(<AddToButton {...{addToCart, productId, selectedProductId}}/>);
      let button = wrapper.find('button');
      expect(button.is('.btn-primary')).toBeTruthy();
      button.simulate('click');
      expect(addToCart.calls.length).toEqual(1);
    })

    it('should have link to `/my_cart`', () => {
      let addToCart = expect.createSpy();
      let productId = 42;
      let selectedProductId = 42;
      const wrapper = shallow(<AddToButton {...{addToCart, productId, selectedProductId}}/>);
      let link = wrapper.find('a.btn-success');
      expect(link.length).toEqual(1);
    })
  })
})
