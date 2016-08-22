import React, { PropTypes } from 'react';
import _ from 'lodash';

export default class Item extends React.Component {

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'updateOrder')
  }

  updateOrder() {
    let { order, status, updateOrder, toggleMenu, fetchOrder } = this.props;
    let newOrder = order.set('orders_status', status);
    updateOrder(newOrder.get('id'), newOrder).then(()=>{
      toggleMenu();
      fetchOrder(order.get('id'));
    })
  }
  render() {
    let { status } = this.props;
    let title = status.get('title');
    let color = status.get('color');
      let style = {
        color: color
      }
    return (
      <li
        className='orders-status__item'
        onClick={this.updateOrder}>
        <b style={style}>{title}</b>
      </li>
    );
  }
}
