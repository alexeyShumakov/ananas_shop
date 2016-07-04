import expect from 'expect'
import React from 'react'
import { shallow, mount } from 'enzyme';
import Immutable from 'immutable';

import Product from '../../app/bundles/AnanasShop/components/Product'
import AddToButton from '../../app/bundles/AnanasShop/components/AddToButton'

describe('component', () => {
  describe('Product', () => {
    let params;
    beforeEach( () => {
      params = {
        productId: 1,
        selectedProductId: 2,
        title: 'my title',
        price: '13',
        thumbCoverUrl: '/image1',
        addToCart: expect.createSpy()
      }
    })
    it('should render correctly title', () => {
      const wrapper = shallow(<Product {...params}/>);
      let titleSpan = wrapper.find('span.product-thumb__title');
      expect(titleSpan.length).toEqual(1);
      expect(titleSpan.text()).toEqual(params.title);
    })

    it('should render correctly price', () => {
      const wrapper = shallow(<Product {...params}/>);
      const priceElement = <b className="product-thumb__price">{params.price} руб.</b>
      expect(wrapper.contains(priceElement)).toBeTruthy();
    })

    it('should render correctly link', () => {
      const wrapper = shallow(<Product {...params}/>);
      expect(wrapper.find('a[href="/products/1"]').length).toEqual(1);
    })

    it('should render correctly img', () => {
      const wrapper = shallow(<Product {...params}/>);
      expect(wrapper.find('img[src="/image1"]').length).toEqual(1);
    })

    it('should render AddToButton comp', () => {
      const wrapper = shallow(<Product {...params}/>);
      expect(wrapper.find(AddToButton).length).toEqual(1);
    })
  })
})
