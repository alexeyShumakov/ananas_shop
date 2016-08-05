import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import _ from 'lodash';
import * as cartActionCreators from '../actions/cartActionCreators';
import { fetchProducts } from '../actions/filtersActionCreators';

import Products from '../components/Products';
import Loader from '../components/Loader';

function select(state) {
  return { $$cartStore: state.$$cartStore, $$filtersStore: state.$$filtersStore };
}

class IndexPageProducts extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    $$cartStore: PropTypes.instanceOf(Immutable.Map).isRequired,
  }

  constructor(props, context) {
    super(props, context);
    const { dispatch, $$cartStore, $$filtersStore } = this.props;
    const actions = bindActionCreators({fetchProducts}, dispatch);
    actions.fetchProducts();
  }

  render() {
    const { dispatch, $$cartStore, $$filtersStore } = this.props;
    const actions = bindActionCreators(cartActionCreators, dispatch);
    let { addToCart, fetchProduct } = actions;
    let products = $$filtersStore.get('products');
    let isLoading = $$filtersStore.get('showcaseLoading');
    let selectedProductId = $$cartStore.get('selectedProductId');
    let preveiwProduct = $$cartStore.get('product');
    let loader;
    if (isLoading) {
      loader = <Loader/>
    }
    return (
      <div className='showcase'>
        {loader}
        <Products {...{preveiwProduct, products, fetchProduct, selectedProductId, addToCart}}/>
      </div>
    );
  }
}

export default connect(select)(IndexPageProducts);
