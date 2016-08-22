import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import _ from 'lodash';

import PriceFilter from '../components/filters/PriceFilter';
import CategoryFilter from '../components/filters/CategoryFilter';
import PageFilter from '../components/filters/PageFilter';
import PageSizeFilter from '../components/filters/PageSizeFilter';
import SortFilter from '../components/filters/SortFilter';
import FieldFilter from '../components/filters/FieldFilter';

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
  }

  getFilter(type) {
    let filterClasses = { SortFilter, PriceFilter, CategoryFilter, PageFilter, PageSizeFilter, FieldFilter };
    const { filters, setFilter, updateFilter, fetchData } = this.props;
    if (!filters.isEmpty()) {
      let filter = filters.find(filter => {
        return filter.get('type') == type;
      });
      return React.createElement(filterClasses[type], {filter, setFilter, updateFilter, fetchData})
    }
  }
  render() {
    let pf = this.getFilter('PageFilter');
    let psf = this.getFilter('PageSizeFilter');

    return (
      <div className='filters'>
        <div>{pf} <div className="hidden-xs hidden-sm">{psf} </div> </div>
        <div className="clearfix"/>
      </div>
    );
  }
}
