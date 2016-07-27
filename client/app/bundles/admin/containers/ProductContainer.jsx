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
    const { $$adminStore, dispatch, id } = this.props;
    const actions = bindActionCreators(productActionCreators, dispatch);
    let productLoading = $$adminStore.get('productLoading');
    let product = $$adminStore.get('product');
    let categories = $$adminStore.get('categories');
    let productErrors = $$adminStore.get('productErrors');
    let { setProductErrors, fetchCategories,
      fetchProduct, updateProduct,
      setProduct, deletePicture,
      createPicture, updatePicture } = actions;
    return (
      <Product {...{id, fetchProduct, fetchCategories, categories,
        updateProduct, setProduct, setProductErrors,
        deletePicture, updatePicture,
        createPicture, productLoading,
        product, productErrors}}/>
    );
  }
}

export default connect(select)(ProductContainer);
