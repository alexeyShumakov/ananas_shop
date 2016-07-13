import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import _ from 'lodash';

import PriceFilter from '../components/filters/PriceFilter';
import CategoryFilter from '../components/filters/CategoryFilter';

export default class Filters extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    fetchData:  PropTypes.func.isRequired,
    setFilter:   PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);
    const { fetchData, query, params } = props;
    if( !_.isEmpty(query)) {
      fetchData(query);
    } else {
      fetchData(params);
    }
  }

  render() {
    let filterClasses = { PriceFilter, CategoryFilter };
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
