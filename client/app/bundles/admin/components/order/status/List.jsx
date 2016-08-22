import React, { PropTypes } from 'react';
import _ from 'lodash';

import Item from './Item';
export default class List extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    let { statuses, fetchOrder, updateOrder, order, toggleMenu } = this.props;
    statuses = statuses.map((status, i) => {
      return <Item
        key={i}
        order={order}
        toggleMenu={toggleMenu}
        status={status}
        fetchOrder={fetchOrder}
        updateOrder={updateOrder}/>
    })
    return (
      <div>
        <ul className='list-unstyled orders-status__list'>
          <div className="orders-status__triangle"/>
          {statuses}
        </ul>
      </div>
    );
  }
}
