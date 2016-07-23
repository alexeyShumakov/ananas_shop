import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import Sidebar from '../components/Sidebar';
import * as sidebarActionCreators from '../actions/sidebarActionCreators';

function select(state) {
  return { $$sidebarStore: state.$$sidebarStore };
}

class SidebarContainer extends React.Component {
  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { $$sidebarStore, dispatch } = this.props;
    const actions = bindActionCreators(sidebarActionCreators, dispatch);
    let { setProduct } = actions;
    let product = $$sidebarStore.get('product');

    return (
      <Sidebar {...{product, setProduct} } />
    );
  }
}

export default connect(select)(SidebarContainer);
