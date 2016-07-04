import React, { PropTypes } from 'react';
import Rcslider from 'rc-slider';
import Immutable from 'immutable';
import _ from 'lodash';

export default class PriceFilter extends React.Component {
  static propTypes = {
    priceFilter:    PropTypes.instanceOf(Immutable.Map).isRequired,
    fetchData:      PropTypes.func.isRequired,
    setPriceFilter: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'updateB');
  }

  updateB(e) {
    let params = {min: e[0], max: e[1]}
    this.props.setPriceFilter(params);
  }

  render() {
    let min = this.props.priceFilter.get('min');
    let max = this.props.priceFilter.get('max');
    let minB = this.props.priceFilter.get('minB');
    let maxB = this.props.priceFilter.get('maxB');
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
           onChange={this.updateB}
           onAfterChange={this.props.fetchData} />
      </div>
    );
  }
}
