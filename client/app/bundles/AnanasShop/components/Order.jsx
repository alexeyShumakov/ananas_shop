import React, { PropTypes } from 'react';
import _ from 'lodash';

import LineItem from './order/LineItem';
import Status from './order/Status';

export default class Order extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {show: false};
    _.bindAll(this, 'toggleOrder');
  }

  toggleOrder(e) {
    e.preventDefault();
    let { show } = this.state;
    this.setState({show: !show});
  }
  render() {
    let { order } = this.props;
    let { show } = this.state;
    let showButton;
    let lineItems;
    if (show) {
      showButton = <a onClick={this.toggleOrder} href='#'>скрыть</a>
      lineItems = order.get('line_items').map((li, i) => {
        return <LineItem key={i} lineItem={li}/>
      })
    } else {
      showButton = <a onClick={this.toggleOrder} href='#'>показать товары</a>
    }
    return (
      <div>
        <dl className="dl-horizontal">
          <dt>номер:</dt>
          <dd>{order.get('id')}</dd>
          <dt>дата:</dt>
          <dd>{order.get('created_at')}</dd>
          <dt>статус:</dt>
          <dd><Status order={order}/></dd>
          <dt>сумма:</dt>
          <dd>{order.get('fixed_total_price')} руб.</dd>
          <dt>товары:</dt>
          <dd>{showButton} {lineItems}</dd>
        </dl>
        <hr/>
      </div>
    );
  }
}
