import React, { PropTypes } from 'react';
import _ from 'lodash';

export default class Cart extends React.Component {
  static propTypes = {
    count: PropTypes.number.isRequired
  }

  constructor(props, context) {
    super(props, context);

  }

  render() {
    const { count } = this.props;
    return (
      <p className="navbar-text navbar-right">
        <span className="glyphicon glyphicon-shopping-cart"></span>
        <a href="/my_cart" className="navbar-link">Моя корзина ({ count })</a>
      </p>
    );
  }
}
