import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { bindActionCreators } from 'redux';

import * as cartActionCreators from '../actions/cartActionCreators';
import FullProduct from '../components/FullProduct';

function select(state) {
  return { $$cartStore: state.$$cartStore };
}

class FullProductContainer extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,

    $$cartStore: PropTypes.instanceOf(Immutable.Map).isRequired,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { dispatch, $$cartStore, productId } = this.props;
    const actions = bindActionCreators(cartActionCreators, dispatch);
    let { fetchProduct, addToCart, fetchLastSeen } = actions;
    let product = $$cartStore.get('product');
    let selectedProductId = $$cartStore.get('selectedProductId');

    return (
      <FullProduct {...{productId, fetchLastSeen, fetchProduct, product, addToCart, selectedProductId}}/>
    );
  }
}

export default connect(select)(FullProductContainer);
