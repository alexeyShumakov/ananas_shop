import React, { PropTypes } from 'react';
import _ from 'lodash';

export default class HFormGroup extends React.Component {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'update', 'value');
  }

  value() {
    let { field, object } = this.props;
    return object.getIn(field.split('.'));
  }

  error() {
    let { field, object, errors } = this.props;
    return errors.get(field);
  }
  update(e) {
    let { field, object, update} = this.props;
    field = field.split('.');
    let newObj = object.setIn(field, e.target.value);
    update(newObj);
  }

  render() {
    let { label, field, object, errors} = this.props;
    let value = this.value();
    let error = this.error();
    if (error) { error = <span className="help-block">{error}</span> }
    return (
      <div className={error ? 'form-group has-error' : 'form-group'}>
        <label className=" col-sm-3 control-label">{label}</label>
        <div className="col-sm-9">
          <input className="form-control" value={value} onChange={this.update}/>
          {error}
        </div>
      </div>
    );
  }
}
