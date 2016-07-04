import expect from 'expect'
import React from 'react'
import Immutable from 'immutable';
import { shallow, mount } from 'enzyme';

import PrevCartItem from '../../../app/bundles/AnanasShop/components/prevCart/PrevCartItem';

describe('component', () => {
  describe('PrevCartItem', () => {
    const item = Immutable.fromJS({
      id: 1,
      count: 2,
      total_price: '2.00',
      product: {
        id: 2,
        price: '1.00',
        title: 'Tilte',
        thumb_cover_url: '/image'
      }
    })

    it('should render link to product', () => {
      const wrapper = shallow(<PrevCartItem {...{item}}/>);
      expect(wrapper.find('a[href="/products/2"]').length).toEqual(1);
    })

    it('should render products image', () => {
      const wrapper = shallow(<PrevCartItem {...{item}}/>);
      expect(wrapper.find('img[src="/image"]').length).toEqual(1);
    })

    it('should contains product title', () => {
      const wrapper = shallow(<PrevCartItem {...{item}}/>);
      let title = <td> {item.getIn(['product', 'title'])} </td>
      expect(wrapper.contains(title)).toBeTruthy();
    })

    it('should contains product totalPrice', () => {
      const wrapper = shallow(<PrevCartItem {...{item}}/>);
      let price = <td> {item.get('total_price')} </td>
      expect(wrapper.contains(price)).toBeTruthy();
    })

    it('should contains product count x price element', () => {
      const wrapper = shallow(<PrevCartItem {...{item}}/>);
      let price = <td> {item.get('count')} x {item.getIn(['product', 'price'])} </td>
      expect(wrapper.contains(price)).toBeTruthy();
    })
  })
})
