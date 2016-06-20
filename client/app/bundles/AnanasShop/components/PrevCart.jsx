
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
      <div className="prev-cart hidden-xs">
        <div className='panel panel-default'>
          <div className="panel-body">
            <div className="panel-heading">
              {totalCount} шт. | {totalPrice} руб.
            </div>
            <div className="prev-cart__table-container">
              <table className='table'>
                <tbody>
                {items}
                </tbody>
              </table>
            </div>
            <hr/>
            <a className="btn btn-primary btn-block" href="/my_cart">Перейти в корзину</a>
          </div>
        </div>
      </div>
    );
  }
}
