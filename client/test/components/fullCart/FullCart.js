import expect from 'expect'
import React from 'react'
import { shallow, mount } from 'enzyme';
import Immutable from 'immutable';

import FullCart from '../../../app/bundles/AnanasShop/components/fullCart/FullCart'
import LineItem from '../../../app/bundles/AnanasShop/components/fullCart/LineItem'

const cart = Immutable.fromJS({
  id: 1,
  total_count: 1,
  total_price: '1.00',
  line_items: [{
    id: 1,
    count: 1,
    product: {
      price: '1.00',
      title: 'Title',
      thumb_cover_url: '/image1'
    }
  }]
});

describe('component', () => {
  describe('FullCart', () => {
    let params;
    beforeEach( () => {
      params = {
        cart: cart,
        cartLoadingState: true,
        updateLineItem: expect.createSpy(),
        destroyLineItem: expect.createSpy()
      }
    })
    it('should render correctly', () => {
      const wrapper = shallow(<FullCart {...params}/>);
      const totalPrice = <b className='my-cart__total-price'>{params.cart.get('total_price')} руб.</b>
      expect(wrapper.hasClass('my-cart')).toBeTruthy();
      expect(wrapper.find('LineItem').length).toEqual(0);
      expect(wrapper.contains(totalPrice)).toBeTruthy();
    })

    it('should not render lineItem if loadingState is true', () => {
      const wrapper = shallow(<FullCart {...params}/>);
      expect(wrapper.hasClass('my-cart')).toBeTruthy();
      expect(wrapper.find('LineItem').length).toEqual(0);
    })

    it('should render lineItem if loadingState is false', () => {
      params.cartLoadingState = false;
      const wrapper = shallow(<FullCart {...params}/>);
      expect(wrapper.hasClass('my-cart')).toBeTruthy();
      expect(wrapper.find('LineItem').length).toEqual(1);
    })
  })
})
