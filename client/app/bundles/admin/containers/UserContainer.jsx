import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import * as userActionCreators from '../actions/userActionCreators';
import User from '../components/User';

function select(state) {
  return { $$adminStore: state.$$adminStore };
}

class UserContainer extends React.Component {
  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { $$adminStore, dispatch, id } = this.props;
    const actions = bindActionCreators(userActionCreators, dispatch);
    return (
      <User id={id} store={$$adminStore} actions={actions} />
    );
  }
}

export default connect(select)(UserContainer);
