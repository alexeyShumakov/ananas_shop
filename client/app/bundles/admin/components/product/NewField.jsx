import React, { PropTypes } from 'react';
import _ from 'lodash';

import Modal from 'react-modal';
import Select from 'react-select';

export default class NewField extends React.Component {
  constructor(props, context) {
    super(props, context);
    Modal.setAppElement('body');
    this.state = {modal: false, field: null};
    _.bindAll(this, 'openModal', 'closeModal', 'setField', 'createProductsField');
  }

  openModal() {
    this.props.fetchFields();
    this.setState({modal: true});
  }

  closeModal() {
    this.setState({modal: false});
  }

  setField(field) {
    this.setState({field});
  }

  createProductsField() {
    let { id, createProductsField } = this.props;
    let { field } = this.state;
    let fieldId = field ? field.value : '';
    let products_field = {
      product_id: id,
      field_id: fieldId
    }

    createProductsField(products_field);
  }
  render() {
    let { fields } = this.props;
    let options = fields.map( field => {
      return {value: field.get('id'), label: field.get('title')};
    }).toJS();
    return (
      <div>
        <button className="btn btn-success" onClick={this.openModal}>Добавить свойство</button>
        <Modal isOpen={this.state.modal}>
          <button className='btn-default btn pull-right' onClick={this.closeModal}>x</button>
          <form>
            <div className="form-group">
              <label>Выберите св-во</label>
              <Select
                  name="form-control"
                  value={this.state.field}
                  options={options}
                  onChange={this.setField}
              />
              <span className="help-block">
              </span>
            </div>
          </form>
          <button className='btn btn-success' onClick={this.createProductsField}>add field to product</button>
        </Modal>
      </div>
    );
  }
}
