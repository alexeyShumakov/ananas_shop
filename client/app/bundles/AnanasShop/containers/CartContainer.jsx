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
  }

  render() {
    const { $$cartStore, dispatch, cartId } = this.props;
    const actions = bindActionCreators(cartActionCreators, dispatch);
    const { destroyLineItem, fetchCart } = actions;
    const cart = $$cartStore.get('cart');

    return (
      <Cart {...{cartId, cart, destroyLineItem, fetchCart}} />
    );
  }
}

export default connect(select)(CartContainer);
