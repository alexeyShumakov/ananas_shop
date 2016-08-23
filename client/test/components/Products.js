import expect from 'expect'
import React from 'react'
import { shallow, mount } from 'enzyme';
import Immutable from 'immutable';

import Products from '../../app/bundles/AnanasShop/components/Products'
import Product from '../../app/bundles/AnanasShop/components/Product'

describe('component', () => {
  describe('Products', () => {
    let params;
    beforeEach( () => {
      params = {
        selectedProductId: 1,
        products: Immutable.fromJS([
          { id: '1', title: 'title', price: 1, thumb_cover_url: '/img1', pictures:[] },
          { id: '2', title: 'title1', price: 1, thumb_cover_url: '/img1', pictures:[] }
        ]),
        addToCart: expect.createSpy()
      }
    })
    it('should render correctly', () => {
      let { selectedProductId, products, addToCart } = params;
      const wrapper = shallow(<Products {...{selectedProductId, products, addToCart}}/>);
      expect(wrapper.hasClass('products-grid')).toBeTruthy();
    })
    it('should have 2 <Product/>`s', () => {
      let { selectedProductId, products, addToCart } = params;
      const wrapper = shallow(<Products {...{selectedProductId, products, addToCart}}/>);
      expect(wrapper.find(Product).length).toEqual(2);
    })

    it('should no render <Product/>', () => {
      let { selectedProductId, addToCart } = params;
      let products = Immutable.fromJS([]);
      const wrapper = shallow(<Products {...{selectedProductId, products, addToCart}}/>);
      expect(wrapper.find(Product).length).toEqual(0);
    })
  })
})
