import React, { PropTypes } from 'react';
import _ from 'lodash';
import Select from 'react-select';

export default class ProductsField extends React.Component {

  constructor(props, context) {
    super(props, context);
    let value = [];
    if (props.fieldsValues.size) {
      value =  props.fieldsValues.map(fv => {
        return { value: fv.get('id'), label: fv.get('title') }
      }).toJS();
    }
    this.state = {value};
    _.bindAll(this, 'updateField');
  }

  updateField(value) {
    let { updateProductsField, id} = this.props;
    let fieldValues = value.map( v => {
      return v.value;
    }).join(';')

    updateProductsField(id, {fields_values: fieldValues});
    this.setState({value});
  }

  render() {
    let { value } = this.state;
    let { field } = this.props;
    let title = field.get('title');
    let allFieldValues = field.get('fields_values');
    let options = [];
    if (allFieldValues.size) {
      options = allFieldValues.map( fv => {
        return { value: fv.get('id'), label: fv.get('title') }
      }).toJS();
    }
    return (
        <div className="form-group">
          <label className="col-sm-2 control-label">
            {title}
          </label>
          <div className="col-sm-10">
            <Select
              multi={true}
              clearable={false}
              options={options}
              value={value}
              onChange={this.updateField}
            />
          </div>
        </div>
    );
  }
}
