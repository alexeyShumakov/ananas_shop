import React, { PropTypes } from 'react';
import _ from 'lodash';

import NewOrdersStatus from './ordersStatus/NewOrdersStatus';
import OrdersStatus from './ordersStatus/OrdersStatus';

export default class Statuses extends React.Component {
  constructor(props, context) {
    super(props, context);
    props.actions.fetchOrdersStatuses();
  }

  render() {
    let { actions, store } = this.props;
    let { fetchOrdersStatuses, createOrdersStatus, setOrdersStatus, updateOrdersStatus, deleteOrdersStatus } = actions;
    let ordersStatus = store.get('ordersStatus');
    let ordersStatuses = store.get('ordersStatuses');
    if (!ordersStatuses.isEmpty()) {
      ordersStatuses = ordersStatuses.map((ordersStatus, key)=>{
        return <OrdersStatus {...{key, ordersStatus, updateOrdersStatus, deleteOrdersStatus, fetchOrdersStatuses}}/>
      })
    }

    return (
      <div>
        <h3>Статусы заказов
          <NewOrdersStatus {...{fetchOrdersStatuses, createOrdersStatus, setOrdersStatus, ordersStatus}}/>
        </h3>
        {ordersStatuses}
      </div>
    );
  }
}
