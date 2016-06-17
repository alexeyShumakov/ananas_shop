import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import Cart from '../components/Cart';
import * as cartActionCreators from '../actions/cartActionCreators';

function select(state) {
  return { $$cartStore: state.$$cartStore };
}

class CartContainer extends React.Component {
  static propTypes = {
    cartId: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    $$cartStore: PropTypes.instanceOf(Immutable.Map).isRequired
  };

  constructor(props, context) {
    super(props, context);

    const { $$cartStore, dispatch, cartId } = this.props;
    const actions = bindActionCreators(cartActionCreators, dispatch);
    const { fetchCart } = actions;
    fetchCart(cartId);
  }

  render() {
    const { $$cartStore, dispatch, cartId } = this.props;
    const actions = bindActionCreators(cartActionCreators, dispatch);
    const { destroyLineItem } = actions;
    const count = $$cartStore.get('cart').get('total_count');
    const price = $$cartStore.get('cart').get('total_price');
    const cart  = $$cartStore.get('cart');

    return (
      <Cart {...{count, price, cart, destroyLineItem}} />
    );
  }
}

export default connect(select)(CartContainer);
