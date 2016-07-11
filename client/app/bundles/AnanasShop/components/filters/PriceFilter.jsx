import React, { PropTypes } from 'react';
import Rcslider from 'rc-slider';
import Immutable from 'immutable';
import _ from 'lodash';

export default class PriceFilter extends React.Component {
  static propTypes = {
  }

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'setFilter', 'fetchData');
  }

  setFilter(value) {
    let { filter, setFilter } = this.props;
    let params = Immutable.List(value);
    let newFilter = filter.set('minB', value[0]).set('maxB', value[1]).set('params', params);
    setFilter(newFilter);
  }

  fetchData() {
    this.props.fetchData();
  }

  render() {
    const { filter } = this.props;
    let min = filter.get('min');
    let max = filter.get('max');
    let minB = filter.get('minB');
    let maxB = filter.get('maxB');
    let value = [minB, maxB];
    return (
      <div>
        <Rcslider
           range
           allowCross={false}
           min={min}
           max={max}
           value={value}
           tipFormatter={null}
           onChange={this.setFilter}
           onAfterChange={this.fetchData}
            />
      </div>
    );
  }
}
