import React, { PropTypes } from 'react';
import _ from 'lodash';

export default class HFormGroup extends React.Component {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'update');
  }

  update(e) {
    let { field, object, update} = this.props;
    let newObj = object.set(field, e.target.value);
    update(newObj);
  }

  render() {
    let { label, field, object, errors} = this.props;
    let value = object.get(field);
    let error = errors.getIn([field, 0]);
    if (error) { error = <span className="help-block">{error}</span> }
    return (
      <div className={error ? 'form-group has-error' : 'form-group'}>
        <label className=" col-sm-3 control-label">{label}</label>
        <div className="col-sm-9">
          <input className="form-control" value={value} onChange={this.update}/>
        </div>
        {error}
      </div>
    );
  }
}
