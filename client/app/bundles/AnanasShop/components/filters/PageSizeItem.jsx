import React from 'react';
import Immutable from 'immutable';
import _ from 'lodash';

export default class PageSizeItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'clickHandler');
  }

  clickHandler() {
    let { filter, updateFilter, size } = this.props;
    let newFilter = filter.set('size', size ).set('params', Immutable.List([size]))
    updateFilter(newFilter);
  }

  render() {
    let { filter, size } = this.props;
    let selected = false;
    if (filter.get('size') == size) { selected = true }
    return(
      <li
      className={ selected ? 'page-size__selected' : '' }
      onClick={ this.clickHandler }> { this.props.size } </li>
    );
  }
}
