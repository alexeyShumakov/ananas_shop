import React, { PropTypes } from 'react';
import { Link } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import _ from 'lodash';
import * as cartActionCreators from '../actions/cartActionCreators';

import Products from '../components/Products';
import PriceFilter from '../components/filters/PriceFilter';

function select(state) {
  return { $$cartStore: state.$$cartStore };
}

class showcaseWrapper extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    $$cartStore: PropTypes.instanceOf(Immutable.Map).isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.inititalFetchData();
    _.bindAll(this, 'goTo', 'fetchData');
  }

  goTo(id) {
    this.context.router.push(`/categories/${id}`);
    this.setCategoryId();
    this.fetchData();
  }

  setCategoryId() {
    let id = this.props.params.categoryId;
    const { dispatch, $$cartStore } = this.props;
    const actions = bindActionCreators(cartActionCreators, dispatch);
    let { setCategoryId } = actions;
    setCategoryId(id);
  }

  inititalFetchData() {
    const { dispatch, $$cartStore } = this.props;
    const actions = bindActionCreators(cartActionCreators, dispatch);
    let { fetchProducts, fetchFilters } = actions;

    let categoryId = this.props.params.categoryId;
    let params = this.props.location.query;

    let filterParams = { category_id: categoryId };

    if (params.price) {
      filterParams.price = params.price;
    }

    fetchProducts(filterParams);
    fetchFilters(filterParams);
  }

  fetchData() {
    const { dispatch, $$cartStore } = this.props;
    const actions = bindActionCreators(cartActionCreators, dispatch);

    let min = $$cartStore.getIn(['filters', 'price', 'minB']);
    let max = $$cartStore.getIn(['filters', 'price', 'maxB']);
    let categoryId = $$cartStore.getIn(['filters', 'categoryId']);

    let { fetchProducts, fetchFilters } = actions;

    this.context.router.push(`/categories/${categoryId}?price=${min};${max}`);
    fetchProducts({category_id: categoryId, price:`${min};${max}`});
    fetchFilters({category_id: categoryId, price:`${min};${max}`});
  }

  render() {
    const { dispatch, $$cartStore } = this.props;
    const actions = bindActionCreators(cartActionCreators, dispatch);
    let { addToCart, setPriceFilter } = actions;
    let products = $$cartStore.get('products');
    let isLoading = $$cartStore.get('showcaseLoading');
    let selectedProductId = $$cartStore.get('selectedProductId');

    let priceFilter = $$cartStore.getIn(['filters', 'price']);
    let fetchData = this.fetchData;
    return (
      <div>
        i am wrapper(it is test links)
        <h1 onClick={()=> this.goTo(3)}>hi {this.props.params.categoryId}</h1>
        <hr/>
        <PriceFilter {...{priceFilter, setPriceFilter, fetchData}} />
        <hr/>
        {this.props.children}
      </div>
    );
  }
}

export default connect(select)(showcaseWrapper);
