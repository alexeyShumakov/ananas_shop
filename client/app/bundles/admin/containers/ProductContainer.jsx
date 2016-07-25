import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import * as productActionCreators from '../actions/productActionCreators';
import Product from '../components/Product'

function select(state) {
  return { $$adminStore: state.$$adminStore };
}

class ProductContainer extends React.Component {
  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { $$adminStore, dispatch } = this.props;
    const actions = bindActionCreators(productActionCreators, dispatch);
    let { test } = actions;
    return (
      <Product {...{test}}/>
    );
  }
}

export default connect(select)(ProductContainer);
