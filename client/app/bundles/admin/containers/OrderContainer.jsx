import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import * as orderActionCreators from '../actions/orderActionCreators';
import Order from '../components/Order';

function select(state) {
  return { $$adminStore: state.$$adminStore };
}

class OrderContainer extends React.Component {
  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { $$adminStore, dispatch, id } = this.props;
    const actions = bindActionCreators(orderActionCreators, dispatch);
    return (
      <Order id={id} store={$$adminStore} actions={actions} />
    );
  }
}

export default connect(select)(OrderContainer);
