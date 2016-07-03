
import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import AddToButton from '../components/AddToButton';
import * as cartActionCreators from '../actions/cartActionCreators';

function select(state) {
  return { $$cartStore: state.$$cartStore };
}

class AddToContainer extends React.Component {
  static propTypes = {
    productId: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,

    $$cartStore: PropTypes.instanceOf(Immutable.Map).isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { productId, $$cartStore, dispatch } = this.props;
    const selectedProductId = $$cartStore.get('selectedProductId');
    const actions = bindActionCreators(cartActionCreators, dispatch);
    const { addToCart } = actions;
    return (
      <AddToButton {...{addToCart, productId, selectedProductId}} />
    );
  }
}

export default connect(select)(AddToContainer);
