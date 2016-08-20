import React, { PropTypes } from 'react';
import _ from 'lodash';

import UpdateOrdersStatus from './UpdateOrdersStatus';
export default class OrdersStatus extends React.Component {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'destroy');
  }

  destroy() {
    let { fetchOrdersStatuses, ordersStatus, deleteOrdersStatus } = this.props;
    deleteOrdersStatus(ordersStatus.get('id')).then(()=> {
      fetchOrdersStatuses();
    }, () => {
      alert('Нельзы удалить этот статус, так как к нему привязаны заказы');
    });
  }
  render() {
    let { ordersStatus, updateOrdersStatus, fetchOrdersStatuses} = this.props;
    let title = ordersStatus.get('title');
    let color = ordersStatus.get('color');
    let style = {
      color: color
    }
    return (
      <div>
        <b style={style}>{title}</b>
        <UpdateOrdersStatus {...{ordersStatus, updateOrdersStatus, fetchOrdersStatuses}}/>
        <span className="glyphicon glyphicon-remove control-icon text-danger" onClick={this.destroy}/>
      </div>
    );
  }
}
