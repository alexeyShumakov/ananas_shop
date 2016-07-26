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
    let { label, value, errors } = this.props;
    let hasErrors = !_.isUndefined(errors);
    let errorTag;
    if (hasErrors) {
      errorTag = <span className='help-block'>{errors.first()}</span>
    }
    return (
      <div className={hasErrors ? 'form-group has-error' : 'form-group'}>
        <label>{label}</label>
        <input
          value={value}
          onChange={this.setValue}
          className='form-control'
          placeholder="название продукта"/>
        {errorTag}
      </div>
    );
  }
}
