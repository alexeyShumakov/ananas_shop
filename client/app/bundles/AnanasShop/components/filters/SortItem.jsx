import React from 'react';

import Immutable from 'immutable';
import _ from  'lodash';

export default class SortItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'clickHandler');
  }

  clickHandler() {
    let { filter, updateFilter, item } = this.props;
    let name = item.get('name');
    let newFilter = filter.set('sort', name ).set('params', Immutable.List([name]))
    updateFilter(newFilter);
  }

  render() {
    let { item, filter } = this.props;
    let selected = false;
    if (filter.get('sort') == item.get('name')) { selected = true }
    return(
      <li
      className={ selected ? 'page-size__selected' : '' }
      onClick={this.clickHandler}>{item.get('title')}</li>
    );
  }
}
