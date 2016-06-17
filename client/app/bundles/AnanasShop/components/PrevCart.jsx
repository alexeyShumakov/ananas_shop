
import React, { PropTypes } from 'react';
import PrevCartItem from './PrevCartItem';
import _ from 'lodash';

export default class PrevCart extends React.Component {
  static propTypes = {
  }

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { cart, destroyLineItem } = this.props;
    let items = [];
    let lineItems = cart.get('line_items');
    let totalPrice = cart.get('total_price');
    let totalCount = cart.get('total_count');
    lineItems.forEach(function(item){
      let key = item.get('id');
      items.push( <PrevCartItem {...{ key, item, destroyLineItem }} />);
    });
    return (
      <div>
        {totalCount} товаров | {totalPrice} руб.
        <hr/>
        {items}
        <hr/>
        <a className="btn btn-default" href="/my_cart">Перейти в корзину</a>
      </div>
    );
  }
}
