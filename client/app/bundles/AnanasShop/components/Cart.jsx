import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import _ from 'lodash';

import PrevCart from './prevCart/PrevCart';

export default class Cart extends React.Component {
  static propTypes = {
    cartId:          PropTypes.number.isRequired,
    cart:            PropTypes.instanceOf(Immutable.Map).isRequired,
    destroyLineItem: PropTypes.func.isRequired,
    fetchCart:       PropTypes.func.isRequired
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
      <div className="navbar-cart">
        <div className="hidden-xs hidden-sm">
          <div
            onMouseEnter={this.mouseEnter}
            onMouseLeave={this.mouseLeave}
            className="navbar-text navbar-right top-cart">
            <span className={`glyphicon glyphicon-shopping-cart ${ isPresent ? 'cart-present' : 'cart-empty'}`}>
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
