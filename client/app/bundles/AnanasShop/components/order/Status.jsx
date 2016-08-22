import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import _ from 'lodash';

export default class Status extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let element;
    let status = this.props.order.get('orders_status');

    if (status) {
      let title = status.get('title');
      let color = status.get('color');
        let style = {
          color: color
        }
      element = <b style={style}>{title}</b>
    } else {
      element = <b>Статус не назначен</b>
    }
    return (
      <span>{element}</span>
    );
  }
}
