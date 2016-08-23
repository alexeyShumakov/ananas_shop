import React, { PropTypes } from 'react';
import _ from 'lodash';
import Select from 'react-select';

import ModalWrapper from '../ModalWrapper';

export default class NewField extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {modal: false, field: null};
    _.bindAll(this, 'toggleModal', 'setField', 'createProductsField');
  }

  toggleModal() {
    let newModal = !this.state.modal;
    this.setState({modal: newModal});
    if (newModal)
      this.props.fetchFields();
  }

  setField(field) {
    this.setState({field});
  }

  createProductsField() {
    let _this = this;
    let { id, createProductsField } = this.props;
    let { field } = this.state;
    let fieldId = field ? field.value : '';
    let products_field = { product_id: id, field_id: fieldId };
    createProductsField(products_field).then(()=> {
      _this.toggleModal();
    })
  }
  render() {
    let { fields } = this.props;
    let options = fields.map( field => {
      return {value: field.get('id'), label: field.get('title')};
    }).toJS();
    return (
      <div className='control-button'>
        <button className="btn btn-success" onClick={this.toggleModal}>Добавить свойство</button>
        <ModalWrapper
          title='Добавить св-во'
          modal={this.state.modal}
          toggleModal={this.toggleModal}>
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
          <button className='btn btn-success' onClick={this.createProductsField}>добавить</button>
        </ModalWrapper>
      </div>
    );
  }
}
