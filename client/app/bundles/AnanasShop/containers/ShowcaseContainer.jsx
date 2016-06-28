import React, { PropTypes } from 'react';
import { Link } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import _ from 'lodash';
import * as cartActionCreators from '../actions/cartActionCreators';

import Products from '../components/Products';
import Loader from '../components/Loader';

function select(state) {
  return { $$cartStore: state.$$cartStore };
}

class showcaseContainer extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    $$cartStore: PropTypes.instanceOf(Immutable.Map).isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.fetchData(this.props.params.categoryId);
    _.bindAll(this, 'goTo', 'fetchData');
  }

  goTo(id) {
    this.context.router.push(`/categories/${id}`);
    this.fetchData(id);
  }

  fetchData(id) {
    const { dispatch, $$cartStore } = this.props;
    const actions = bindActionCreators(cartActionCreators, dispatch);
    let { fetchProducts } = actions;
    fetchProducts({category_id: id})
  }

  render() {
    const { dispatch, $$cartStore } = this.props;
    const actions = bindActionCreators(cartActionCreators, dispatch);
    let { addToCart } = actions;
    let products = $$cartStore.get('products');
    let isLoading = $$cartStore.get('showcaseLoading');
    let selectedProductId = $$cartStore.get('selectedProductId');
    let loader;
    if (isLoading) {
      loader = <Loader/>
    }
    return (
      <div>
        {loader}
        <h1 onClick={()=> this.goTo(3)}>hi {this.props.params.categoryId}</h1>
        <Link to="/about">About</Link>
        <Link to='/categories/1' onClick={()=> this.fetchData(1)}> l1 </Link>
        <Link to='/categories/2' onClick={()=> this.fetchData(2)}> l2 </Link>
        <Products {...{products, selectedProductId, addToCart}}/>
      </div>
    );
  }
}

export default connect(select)(showcaseContainer);
