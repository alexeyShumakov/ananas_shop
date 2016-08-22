import React, { PropTypes } from 'react';
import _ from 'lodash';

import CategoryFilter from '../filters/CategoryFilter';
import PageFilter from '../filters/PageFilter';
import KeywordFilter from '../filters/KeywordFilter';

export default class Filters extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  getFilter(type) {
    let filterClasses = { CategoryFilter, PageFilter, KeywordFilter };
    let { updateFilter, fetchData, filters } = this.props;
    let filter = filters.find(filter => {
      return filter.get('type') == type;
    });
    if (filter)
      return React.createElement(filterClasses[type], {filter, updateFilter, fetchData})
  }

  render() {
    let categoryFilter = this.getFilter('CategoryFilter');
    let pageFilter = this.getFilter('PageFilter');
    let KeywordFilter = this.getFilter('KeywordFilter')
    return (
      <div className='row'>
        <div className="col-md-4">
          {categoryFilter}
        </div>
        <div className="col-md-8">
          {KeywordFilter}
          {pageFilter}
          <div className="clearfix"/>
          {this.props.children}
        </div>
      </div>
    );
  }
}
