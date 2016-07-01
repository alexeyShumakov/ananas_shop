import React, { PropTypes } from 'react';
import _ from 'lodash';

import PriceFilter from '../components/filters/PriceFilter';

export default class Filters extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
  }
  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'fetchData');
    this.inititalFetchData();
  }

  inititalFetchData() {
    let categoryId = this.props.categoryId;
    let params = this.props.query;

    let filterParams = { category_id: categoryId };

    if (params.price) {
      filterParams.price = params.price;
    }

    this.props.fetchProducts(filterParams);
    this.props.fetchFilters(filterParams);
  }

  fetchData() {
    let min = this.props.priceFilter.get('minB');
    let max = this.props.priceFilter.get('maxB');
    let categoryId = this.props.categoryId;

    this.context.router.push(`/categories/${categoryId}?price=${min};${max}`);
    this.props.fetchProducts({category_id: categoryId, price:`${min};${max}`});
    this.props.fetchFilters({category_id: categoryId, price:`${min};${max}`});
  }

  render() {
    let { priceFilter, setPriceFilter } = this.props;
    let fetchData = this.fetchData;
    return (
      <div>
        i am wrapper(it is test links)
        <h1>hi {this.props.categoryId}</h1>
        <hr/>
        <PriceFilter {...{priceFilter, setPriceFilter, fetchData}} />
      </div>
    );
  }
}
