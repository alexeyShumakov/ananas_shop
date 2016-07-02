import expect from 'expect'
import React from 'react'
import Immutable from 'immutable';
import { shallow, mount } from 'enzyme';

import Cart from '../../app/bundles/AnanasShop/components/Cart';
import PrevCart from '../../app/bundles/AnanasShop/components/prevCart/PrevCart';




describe('component', () => {
  describe('Cart', () => {

    const cartId = 42;
    const cart = Immutable.fromJS({
      id: 0,
      total_count: 2,
      total_price: '1.00',
      line_items: [{
          count: 2,
          product: {
            price: '1.00',
            title: '',
            thumb_cover_url: ''
          }
        }
      ]
    })

    it('should render correctly', () => {
      let fetchCart = expect.createSpy();
      let destroyLineItem = expect.createSpy();
      const wrapper = shallow(<Cart {...{fetchCart, destroyLineItem, cart, cartId}}/>);
      expect(wrapper.hasClass('navbar-cart')).toBeTruthy();
    })

    it('should render cart-present class', () => {
      let fetchCart = expect.createSpy();
      let destroyLineItem = expect.createSpy();
      const wrapper = shallow(<Cart {...{fetchCart, destroyLineItem, cart, cartId}}/>);
      expect(wrapper.find('.cart-present').length).toEqual(1);
    })

    it('should fetch cart from server', () => {
      let fetchCart = expect.createSpy();
      let destroyLineItem = expect.createSpy();
      const wrapper = shallow(<Cart {...{fetchCart, destroyLineItem, cart, cartId}}/>);
      expect(fetchCart.calls.length).toEqual(1);
    })

    it('should render cart-empty class', () => {
      const cart = Immutable.fromJS({
        id: 0,
        total_count: 0,
        total_price: '0.00',
        line_items: []
      })
      let fetchCart = expect.createSpy();
      let destroyLineItem = expect.createSpy();
      const wrapper = shallow(<Cart {...{fetchCart, destroyLineItem, cart, cartId}}/>);
      expect(wrapper.find('.cart-empty').length).toEqual(1);
    })

    it('should show prevCart onMouseEnter and hide onMouseLeave', () => {
      let fetchCart = expect.createSpy();
      let destroyLineItem = expect.createSpy();
      const wrapper = shallow(<Cart {...{fetchCart, destroyLineItem, cart, cartId}}/>);
      wrapper.find('.top-cart').simulate('mouseEnter');
      expect(wrapper.contains(<PrevCart cart={cart}/>)).toBeTruthy();
      wrapper.find('.top-cart').simulate('mouseLeave');
      expect(wrapper.contains(<PrevCart cart={cart}/>)).toBeFalsy();
    })

    it('should contains count number in span', () => {
      let fetchCart = expect.createSpy();
      let destroyLineItem = expect.createSpy();
      let count = cart.get('total_count');
      const wrapper = shallow(<Cart {...{fetchCart, destroyLineItem, cart, cartId}}/>);
      expect(wrapper.contains(<span className='badge'>{count}</span>)).toBeTruthy();
    })
  })
})
