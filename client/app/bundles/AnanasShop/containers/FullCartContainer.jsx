import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { bindActionCreators } from 'redux';

import * as cartActionCreators from '../actions/cartActionCreators';
import FullCart from '../components/fullCart/FullCart'

function select(state) {
  return { $$cartStore: state.$$cartStore };
}

class FullCartContainer extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,

    $$cartStore: PropTypes.instanceOf(Immutable.Map).isRequired,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { dispatch, $$cartStore } = this.props;
    const actions = bindActionCreators(cartActionCreators, dispatch);
    const { updateLineItem, destroyLineItem } = actions;
    const cartLoadingState = $$cartStore.get('isCartLoading');
    const cart = $$cartStore.get('cart');

    return (
      <FullCart {...{
        cart,
        cartLoadingState,
        updateLineItem,
        destroyLineItem}}/>
    );
  }
}

export default connect(select)(FullCartContainer);
