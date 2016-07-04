import expect from 'expect'
import React from 'react'
import { shallow, mount } from 'enzyme';
import Immutable from 'immutable';
import { FormControl } from 'react-bootstrap';

import LineItem from '../../../app/bundles/AnanasShop/components/fullCart/LineItem'

const lineItem = Immutable.fromJS({
  id: 1,
  count: 1,
  product: {
    id: 1,
    price: '1.00',
    title: 'Title',
    thumb_cover_url: '/image1'
  }
});

describe('component', () => {
  describe('LineItem', () => {
    let params;
    beforeEach( () => {
      params = {
        data: lineItem,
        updateLineItem: expect.createSpy(),
        destroyLineItem: expect.createSpy()
      }
    })
    it('should render correctly', () => {
      const wrapper = shallow(<LineItem {...params}/>);
      expect(wrapper.hasClass('my-cart__line-item')).toBeTruthy();
    })

    it('should render product title', () => {
      const wrapper = shallow(<LineItem {...params}/>);
      let title = <p> {lineItem.getIn(['product', 'title'])} </p>;
      expect(wrapper.contains(title)).toBeTruthy();
    })

    it('should render product link', () => {
      const wrapper = shallow(<LineItem {...params}/>);
      expect(wrapper.find('a[href="/products/1"]').length).toEqual(1);
    })

    it('should render cover image', () => {
      const wrapper = shallow(<LineItem {...params}/>);
      expect(wrapper.find('img[src="/image1"]').length).toEqual(1);
    })

    it('should render product price', () => {
      const wrapper = shallow(<LineItem {...params}/>);
      expect(wrapper.find('.line-item__product-price').length).toEqual(1);
    })

    it('should render form control', () => {
      const wrapper = shallow(<LineItem {...params}/>);
      expect(wrapper.find(FormControl).length).toEqual(1);
    })

    it('should destroy line item on click', () => {
      const wrapper = shallow(<LineItem {...params}/>);
      let deleteSpan = wrapper.find('span.my-cart__remove-line-item')
      deleteSpan.simulate('click')
      expect(params.destroyLineItem.calls.length).toEqual(1);
    })

    it('should update line item on change', () => {
      const wrapper = shallow(<LineItem {...params}/>);
      let formControl = wrapper.find(FormControl);
      formControl.simulate('change', {target: {value: 'My new value'}});
      expect(params.updateLineItem.calls.length).toEqual(1);
    })
  })
})
