import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import * as statusActionCreators from '../actions/statusActionCreators';
import Order from '../components/Statuses';

function select(state) {
  return { $$adminStore: state.$$adminStore };
}

class StatusesContainer extends React.Component {
  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { $$adminStore, dispatch, id } = this.props;
    const actions = bindActionCreators(statusActionCreators, dispatch);
    return (
      <Order id={id} store={$$adminStore} actions={actions} />
    );
  }
}

export default connect(select)(StatusesContainer);
