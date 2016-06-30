import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import { FormControl } from 'react-bootstrap';

export default class MinPriceInput extends React.Component {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'blur', 'updateTempValue', 'blurInput', 'inputFetch' );
  }

  updateTempValue(e) {
    this.props.updateTempValue({tempMin: e.target.value});
  }

  blur() {
    console.log('blurrrr!');
    this.props.fetchData();
  }

  blurInput(e) {
    console.log('keyUp');
    if(e.key === 'Enter') {
      ReactDOM.findDOMNode(this.refs.theInput).blur();
    }
  }

  inputFetch(e) {
    console.log('keyPress');
    if(e.key === 'Enter') {
      let tempMin = parseInt(this.props.tempValue) || min;
      let min = this.props.min;
      let maxB = this.props.maxB;
      let params = {min: tempMin, max: this.props.tempMax};

      if((min >= tempMin) || (tempMin >= maxB)) {
        this.props.updateTempValue({ tempMin: min });
        params = {min: min, max: maxB};
      } else {
      }
      this.props.setPriceFilter(params);
    }
  }

  render() {
    return (
      <div>
        <FormControl
          ref='theInput'
          className='form-control price-filter__input'
          value={this.props.tempValue}
          onChange={this.updateTempValue}
          onKeyUp={this.blurInput}
          onKeyPress={this.inputFetch}
          onBlur={this.blur}
          />
      </div>
    );
  }
}
