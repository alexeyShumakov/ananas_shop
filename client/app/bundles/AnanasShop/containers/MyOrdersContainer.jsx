import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import MyOrders from '../components/MyOrders';
import * as cartActionCreators from '../actions/cartActionCreators';

function select(state) {
  return { $$cartStore: state.$$cartStore };
}

class MyOrdersContainer extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    $$cartStore: PropTypes.instanceOf(Immutable.Map).isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { dispatch, $$cartStore } = this.props;
    const actions = bindActionCreators(cartActionCreators, dispatch);
    return (
      <MyOrders actions={actions} store={$$cartStore} />
    );
  }
}

export default connect(select)(MyOrdersContainer);
