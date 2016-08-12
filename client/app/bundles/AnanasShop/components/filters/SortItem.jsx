import React from 'react';

import Immutable from 'immutable';
import _ from  'lodash';

export default class SortItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { currentValueIndex: 0 };
    _.bindAll(this, 'setValue', 'toggleValue');
  }

  setValue() {
    let { filter, updateFilter, item } = this.props;
    let name = item.getIn(['values', 0, 'name']);
    let newFilter = filter.set('sort', name ).set('params', Immutable.List([name]))
    updateFilter(newFilter);
  }

  toggleValue() {
    let { filter, updateFilter, item } = this.props;
    let { currentValueIndex } = this.state;
    let name;
    let values = item.get('values');
    let currentValue = values.get(currentValueIndex + 1);
    if (currentValue) {
      this.setState({currentValueIndex: currentValueIndex + 1});
      name = currentValue.get('name');
    } else {
      this.setState({currentValueIndex: 0});
      name = values.getIn([0, 'name']);
    }
    let newFilter = filter.set('sort', name ).set('params', Immutable.List([name]))
    updateFilter(newFilter);
  }

  render() {
    let { item, filter } = this.props;
    let selected = false;
    let element =
      <div onClick={this.setValue}>
        {item.get('title')}
      </div>

    let currnetItem = item.get('values').find( i => {
      return i.get('name') == filter.get('sort');
    });
    if (currnetItem) { selected = true }
    if (selected) {
      element =
        <div onClick={this.toggleValue}>
          {currnetItem.get('title')}
        </div>
    }
    return(
      <li className={ selected ? 'page-size__selected' : '' }> {element} </li>
    );
  }
}
