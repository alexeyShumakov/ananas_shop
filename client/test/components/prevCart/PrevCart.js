import expect from 'expect'
import React from 'react'
import Immutable from 'immutable';
import { shallow, mount } from 'enzyme';

import PrevCart from '../../../app/bundles/AnanasShop/components/prevCart/PrevCart';
import PrevCartItem from '../../../app/bundles/AnanasShop/components/prevCart/PrevCartItem';

describe('component', () => {
  describe('PrevCart', () => {
    const cart = Immutable.fromJS({
      id: 1,
      total_count: 2,
      total_price: '1.00',
      line_items: [{
        id: 1,
        count: 2,
        product: {
          price: '1.00',
          title: 'Tilte',
          thumb_cover_url: '/image'
        }
      }]
    })

    it('should render correctly', () => {
      const wrapper = shallow(<PrevCart {...{cart}}/>);
      expect(wrapper.hasClass('prev-cart')).toBeTruthy();
    })

    it('should render PrevCartItem', () => {
      const wrapper = shallow(<PrevCart {...{cart}}/>);
      expect(wrapper.find(PrevCartItem).length).toEqual(1);
    })

    it('should contains cart info', () => {
      const wrapper = shallow(<PrevCart {...{cart}}/>);
      let info =
          <div className="panel-heading">
            {cart.get('total_count')} шт. | {cart.get('total_price')} руб.
          </div>
      expect(wrapper.contains(info)).toBeTruthy();
    })
  })
})
