import React, { PropTypes } from 'react';
import _ from 'lodash';

import Order from './Order';
export default class MyOrders extends React.Component {
  constructor(props, context) {
    super(props, context);
    let { fetchProfile } = props.actions;
    fetchProfile();
  }
  render() {
    let orders = this.props.store.getIn(['profile', 'orders']);
    if (orders) {
      orders = orders.map((order, i) => {
        return <Order key={i} order={order}/>
      });
    }
    return (
      <div>
        <h4>Ваши заказы:</h4>
        {orders}
    </div>
    );
  }
}
