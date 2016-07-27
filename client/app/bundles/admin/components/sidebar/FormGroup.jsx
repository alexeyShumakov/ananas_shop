import React, { PropTypes } from 'react';
import _ from 'lodash';

export default class FormGroup extends React.Component {

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'setValue');
  }

  setValue(e) {
    let { field, setValue } = this.props;
    setValue(field, e.target.value);

  }
  render() {
    let input;
    let { label, value, errors, textarea } = this.props;
    let hasErrors = !_.isUndefined(errors);
    let errorTag;
    if (hasErrors) {
      errorTag = <span className='help-block'>{errors.first()}</span>
    }
    input =
      <input
        value={value}
        onChange={this.setValue}
        className='form-control' />
    if (textarea) {
      input =
        <textarea
          value={value}
          onChange={this.setValue}
          className='form-control' />
    }
    return (
      <div className={hasErrors ? 'form-group has-error' : 'form-group'}>
        <label>{label}</label>
        {input}
        {errorTag}
      </div>
    );
  }
}
