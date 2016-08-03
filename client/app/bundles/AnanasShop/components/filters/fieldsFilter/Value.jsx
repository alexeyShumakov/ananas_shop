import React from 'react';
import _ from 'lodash';
import Immutable from 'immutable';

export default class Value extends React.Component {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'updateFilter');
  }

  updateFilter() {
    let { updateFilter, filter, value } = this.props;
    let newParams;
    let params = filter.get('params');
    let id = value.get('id').toString();
    if (params.includes(id)) {
      newParams = params.filter(x => x !== id);
    } else {
      newParams = params.push(id);
    }
    let newFilter = filter.set('params', newParams);
    updateFilter(newFilter);
  }

  render() {
    let { value } = this.props;
    let title = value.get('title');
    let isSelected = value.get('selected');
    let valueTag;
    if (isSelected) {
      valueTag =
        <div className='fields-filter__value_selected'>
          <span className="glyphicon glyphicon-ok text-success"/>
          <b className='fields-filter__value-title_selected'>{title}</b>
        </div>
    } else {
        valueTag = <div> <span className='fields-filter__value-title'>{title}</span> </div>
    }
    return(
      <div onClick={this.updateFilter} className='fields-filter__value'>
        {valueTag}
      </div>
    );
  }
}
