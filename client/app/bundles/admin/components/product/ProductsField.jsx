import React, { PropTypes } from 'react';
import _ from 'lodash';
import Select from 'react-select';
import Tooltip from 'rc-tooltip';

import CreateFieldsValue from './CreateFieldsValue';

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
    _.bindAll(this, 'updateField', 'deleteProductsField');
  }

  updateField(value) {
    let { updateProductsField, id} = this.props;
    let fieldValues = value.map( v => {
      return v.value;
    }).join(';')

    updateProductsField(id, {fields_values: fieldValues});
    this.setState({value});
  }

  deleteProductsField() {
    let { deleteProductsField, id } = this.props;
    deleteProductsField(id);
  }

  render() {
    let { value } = this.state;
    let { field, fieldsValue, createFieldsValue, setFieldsValue, id, product_id } = this.props;
    let fieldId = field.get('id')
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
            {title} <CreateFieldsValue {...{fieldsValue, createFieldsValue, setFieldsValue, fieldId, product_id}}/>
          </label>
          <div className="col-sm-9">
            <Select
              multi={true}
              clearable={false}
              options={options}
              value={value}
              onChange={this.updateField}
            />
          </div>
          <label className="col-sm-1 control-label">
            <Tooltip
              placement='top'
              trigger='hover'
              overlay={<div>Удалить св-во продукта</div>}
              mouseEnterDelay={0}
              mouseLeaveDelay={0.1}>
              <span className="glyphicon glyphicon-remove text-danger control-icon" onClick={this.deleteProductsField}></span>
            </Tooltip>
          </label>
        </div>
    );
  }
}
