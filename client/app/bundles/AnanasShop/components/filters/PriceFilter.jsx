import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Rcslider from 'rc-slider';
import Immutable from 'immutable';
import { FormControl } from 'react-bootstrap';
import _ from 'lodash';

export default class PriceFilter extends React.Component {
  static propTypes = {
  }

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'blurMinInput', 'blurMaxInput', 'setFilter', 'updateFilter',
              'fetchData', 'updateMinForm', 'updateMaxForm');
  }

  setFilter(value) {
    let { filter, setFilter } = this.props;
    let params = Immutable.List(value);
    let newFilter = filter
    .set('minB', value[0]).set('maxB', value[1])
    .set('minFormB', value[0]).set('maxFormB', value[1])
    .set('params', params);
    setFilter(newFilter);
  }

  fetchData() {
    this.props.fetchData();
  }

  updateFilter() {
    let { filter, setFilter } = this.props;
    let minForm = filter.get('minFormB') || filter.get('min');
    minForm = minForm.toString().match(/\d+/);
    minForm = parseInt(minForm);
    if (minForm < filter.get('min') || minForm > filter.get('maxB') ) {
      minForm = filter.get('min');
    }
    let maxForm = filter.get('maxFormB') || filter.get('max');
    maxForm = maxForm.toString().match(/\d+/);
    maxForm = parseInt(maxForm);
    if (maxForm > filter.get('max') || maxForm < filter.get('minB')) {
      maxForm = filter.get('max');
    }
    let params = Immutable.List([minForm, maxForm]);
    let newFilter = filter.set('minB', minForm)
    .set('maxB', maxForm).set('params', params);
    this.props.updateFilter(newFilter);
  }

  blurMinInput(e) {
    if(e.key === 'Enter') {
      ReactDOM.findDOMNode(this.refs.minInput).blur();
    }
  }

  blurMaxInput(e) {
    if(e.key === 'Enter') {
      ReactDOM.findDOMNode(this.refs.maxInput).blur();
    }
  }

  updateMinForm(e) {
    let { filter, setFilter } = this.props;
    let value = e.target.value;
    let newFilter = filter.set('minFormB', value)
    setFilter(newFilter);
  }

  updateMaxForm(e) {
    let { filter, setFilter } = this.props;
    let value = e.target.value;
    let newFilter = filter.set('maxFormB', value)
    setFilter(newFilter);
  }

  render() {
    const { filter } = this.props;
    let min = filter.get('min');
    let max = filter.get('max');
    let minB = filter.get('minB');
    let maxB = filter.get('maxB');
    let minFormB = filter.get('minFormB');
    let maxFormB = filter.get('maxFormB');
    let value = [minB, maxB];
    return (
      <div>
        <FormControl
          ref='minInput'
          className='form-control price-filter__input'
          value={minFormB}
          onChange={this.updateMinForm}
          onBlur={this.updateFilter}
          onKeyUp={this.blurMinInput}
          />
        <FormControl
          ref='maxInput'
          className='form-control price-filter__input'
          value={maxFormB}
          onChange={this.updateMaxForm}
          onBlur={this.updateFilter}
          onKeyUp={this.blurMaxInput}
          />
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
