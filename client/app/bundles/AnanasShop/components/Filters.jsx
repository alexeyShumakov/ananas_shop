import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import _ from 'lodash';

import PriceFilter from '../components/filters/PriceFilter';
import CategoryFilter from '../components/filters/CategoryFilter';
import PageFilter from '../components/filters/PageFilter';

export default class Filters extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    fetchData:  PropTypes.func.isRequired,
    setFilter:   PropTypes.func.isRequired,
    updateFilter: PropTypes.func.isRequired,
    filters: PropTypes.instanceOf(Immutable.List).isRequired,
    query: PropTypes.object,
    params: PropTypes.object
  }

  constructor(props, context) {
    super(props, context);
    const { fetchData, query, params } = props;
    _.isEmpty(query) ? fetchData(params) : fetchData(query);
  }

  render() {
    let filterClasses = { PriceFilter, CategoryFilter, PageFilter };
    const { filters, setFilter, updateFilter, fetchData } = this.props;
    let list = filters.map((filter, key) => {
      let fClass = filterClasses[filter.get('type')];
      return React.createElement(fClass, {key, filter, setFilter, updateFilter, fetchData})
    })
    return (
      <div className='filters'>
        {list}
      </div>
    );
  }
}
