import React, { PropTypes } from 'react';
import _ from 'lodash';

import Modal from 'react-modal';
import Select from 'react-select';

import FormGroup from './sidebar/FormGroup'
export default class NewModalProduct extends React.Component {

  constructor(props, context) {
    super(props, context);
    Modal.setAppElement('body');
    props.fetchCategories();
    this.state = {modal: false, category: null};
    _.bindAll(this, 'openModal', 'createProduct', 'closeModal', 'setValue', 'setCategory');
  }

  openModal() {
    this.setState({modal: true});
  }

  closeModal() {
    this.setState({modal: false});
  }

  setValue(field, value) {
    let newProductState = this.props.product.set(field, value);
    this.props.setProduct(newProductState);
  }

  setCategory(category) {
    this.setState({category: category});
    let value = category ? category.value : '';
    let newProductState = this.props.product.set('category_id', value);
    this.props.setProduct(newProductState);
  }

  createProduct() {
    let { createProduct, product } = this.props;
    createProduct(product.toJS());
  }
  render() {
    let { categories, product, productErrors } = this.props;
    let { title, category_id, price, description } = product.toJS();

    let categoryError = productErrors.get('category');
    if (categoryError) { categoryError = categoryError.first() }
    let options = categories.map( category => {
      return {value: category.get('id'), label: category.get('title')};
    }).toJS();

    return (
      <div>
        <button className='list-group-item' onClick={this.openModal}> new product </button>
        <Modal isOpen={this.state.modal}>
          <button className='btn-default btn pull-right' onClick={this.closeModal}>x</button>
          <form>
            <FormGroup
              label='Название'
              setValue={this.setValue}
              errors={productErrors.get('title')}
              value={title}
              field='title'/>

            <FormGroup
              label='Цена'
              setValue={this.setValue}
              errors={productErrors.get('price')}
              value={price}
              field='price'/>

            <div className="form-group">
              <label>Категория</label>
              <Select
                  name="form-control"
                  value={this.state.category}
                  options={options}
                  onChange={this.setCategory}
              />
              <span className="help-block">
                {categoryError}
              </span>
            </div>

            <FormGroup
              textarea={true}
              label='Описание'
              setValue={this.setValue}
              errors={productErrors.get('description')}
              value={description}
              field='description'/>
          </form>
          <button onClick={this.createProduct} className="btn btn-default">Создать продукт</button>
        </Modal>
      </div>
    );
  }
}
