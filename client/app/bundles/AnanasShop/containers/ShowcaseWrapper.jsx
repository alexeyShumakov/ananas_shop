import React, { PropTypes } from 'react';
import { Link } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import Rcslider from 'rc-slider';
import _ from 'lodash';
import * as cartActionCreators from '../actions/cartActionCreators';

import Products from '../components/Products';
import Loader from '../components/Loader';

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
    this.fetchData(this.props.params.categoryId);
    this.state = { value: [20, 40] };
    _.bindAll(this, 'goTo', 'fetchData', 'onSliderChange', 'fetchPrice');
  }

  goTo(id) {
    this.context.router.push(`/categories/${id}`);
    this.fetchData(id);
  }

  fetchPrice(value) {
    let categoryId = this.props.params.categoryId;
    this.context.router.push(`/categories/${categoryId}?price=${value[0]};${value[1]}`);
    const { dispatch, $$cartStore } = this.props;
    const actions = bindActionCreators(cartActionCreators, dispatch);
    let { fetchProducts, fetchFilters } = actions;
    fetchProducts({category_id: categoryId, price:`${value[0]};${value[1]}`});
    fetchFilters({category_id: categoryId, price:`${value[0]};${value[1]}`});
  }

  onSliderChange(value) {
    this.setState({value: value});
  }

  fetchData(id) {
    let _this = this;
    const { dispatch, $$cartStore } = this.props;
    const actions = bindActionCreators(cartActionCreators, dispatch);
    let min = $$cartStore.get('filters').get('price').get('min');
    let max = $$cartStore.get('filters').get('price').get('max');
    console.log(min);
    let { fetchProducts, fetchFilters } = actions;
    let categoryId = this.props.params.categoryId;
    this.context.router.push(`/categories/${categoryId}?price=${min};${max}`);
    fetchProducts({category_id: id, price:`${min};${max}`});
    fetchFilters({category_id: id, price:`${min};${max}`});
  }

  render() {
    const { dispatch, $$cartStore } = this.props;
    const actions = bindActionCreators(cartActionCreators, dispatch);
    let { addToCart } = actions;
    let products = $$cartStore.get('products');
    let isLoading = $$cartStore.get('showcaseLoading');
    let selectedProductId = $$cartStore.get('selectedProductId');
    let min = $$cartStore.get('filters').get('price').get('min');
    let max = $$cartStore.get('filters').get('price').get('max');
    let loader;
    if (isLoading) {
      loader = <Loader/>
    }
    return (
      <div>
        i am wrapper(it is test links)
        <h1 onClick={()=> this.goTo(3)}>hi {this.props.params.categoryId}</h1>
        <hr/>
         <Rcslider
            range
            allowCross={false}
            min={min}
            max={max}
            value={this.state.value}
            onChange={this.onSliderChange}
            onAfterChange={this.fetchPrice} />
        <Link to="/about">About</Link>
        <Link to='/categories/1' onClick={()=> this.fetchData(1)}> l1 </Link>
        <Link to='/categories/2' onClick={()=> this.fetchData(2)}> l2 </Link>
        <hr/>
        <div className="clearfix"></div>
        {this.props.children}
      </div>
    );
  }
}

export default connect(select)(showcaseWrapper);
