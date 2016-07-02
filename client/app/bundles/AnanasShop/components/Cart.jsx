import React, { PropTypes } from 'react';
import PrevCart from './PrevCart';
import _ from 'lodash';

export default class Cart extends React.Component {
  static propTypes = {
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
    props.fetchCart(props.cartId);
    _.bindAll(this, ['mouseLeave', 'mouseEnter']);
  }

  render() {
    let prevCart;
    const { destroyLineItem, cart } = this.props;
    const count = cart.get('total_count');
    const price = cart.get('total_price');
    let isPresent = count > 0;
    if (this.state.hover && isPresent) {
        prevCart = <PrevCart {...{ cart }}/>
    }
    return (
      <div>
        <div className="hidden-xs hidden-sm">
          <div
            onMouseEnter={this.mouseEnter}
            onMouseLeave={this.mouseLeave}
            className="navbar-text navbar-right top-cart">
            <span
              className={`glyphicon glyphicon-shopping-cart ${ isPresent ? 'cart-present' : 'cart-empty'}`}>
            </span>
            <a href="/my_cart" className="navbar-link"> Моя корзина <span className="badge">{ count }</span>
            </a>
            {prevCart}
          </div>
        </div>

        <div className="visible-xs visible-sm">
          <a href="/my_cart" className='btn btn-link navbar-btn navbar__custom-button'>
            <span className="glyphicon glyphicon-shopping-cart"></span> <span className="badge">{ count }</span>
          </a>
        </div>
      </div>
    );
  }
}
