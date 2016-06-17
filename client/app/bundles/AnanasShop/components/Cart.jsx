import React, { PropTypes } from 'react';
import PrevCart from './PrevCart';
import _ from 'lodash';

export default class Cart extends React.Component {
  static propTypes = {
    count: PropTypes.number.isRequired
  }

  mouseEnter() {
    this.setState({ hover: true });
  }

  mouseLeave() {
    this.setState({ hover: false });
  }

  constructor(props, context) {
    super(props, context);
    this.state = {hover: false};
    _.bindAll(this, ['mouseLeave', 'mouseEnter']);
  }

  render() {
    let prevCart;
    const { count, price, cart, destroyLineItem } = this.props;
    if (this.state.hover && (count > 0)) {
        prevCart = <PrevCart {...{ cart, destroyLineItem }}/>
    }
    return (
      <div onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} className="navbar-text navbar-right">
        <span className="glyphicon glyphicon-shopping-cart"></span>
        <a href="/my_cart" className="navbar-link">Моя корзина ({ count } шт., { price } руб.)</a>
        <div className='prev-cart'>{prevCart}</div>
      </div>
    );
  }
}
