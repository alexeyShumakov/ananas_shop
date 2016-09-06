import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import CategoriesMenu from '../components/CategoriesMenu';
import * as cartActionCreators from '../actions/cartActionCreators';

function select(state) {
  return { $$cartStore: state.$$cartStore };
}

class CategoriesMenuContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { dispatch, $$cartStore } = this.props;
    const actions = bindActionCreators(cartActionCreators, dispatch);
    return (
      <CategoriesMenu actions={actions} store={$$cartStore} />
    );
  }
}

export default connect(select)(CategoriesMenuContainer);
