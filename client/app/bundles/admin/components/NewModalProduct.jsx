import React, { PropTypes } from 'react';
import _ from 'lodash';
import Modal from 'react-modal';

export default class NewModalProduct extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {modal: false};
    Modal.setAppElement('body');
    _.bindAll(this, 'openModal', 'closeModal', 'setTitle', 'setPrice', 'setCategory');
  }

  openModal() {
    this.setState({modal: true});
  }

  closeModal() {
    this.setState({modal: false});
  }

  setTitle(e) {
    let newProductState = this.props.product.set('title', e.target.value);
    this.props.setProduct(newProductState)
  }

  setPrice(e) {
    let newProductState = this.props.product.set('price', e.target.value);
    this.props.setProduct(newProductState)
  }

  setCategory(e) {
    let newProductState = this.props.product.set('category', e.target.value);
    this.props.setProduct(newProductState)
  }
  render() {
    let { title, category, price } = this.props.product.toJS();
    return (
      <div>
        <button className='list-group-item' onClick={this.openModal}>
          new product
        </button>
        <Modal isOpen={this.state.modal}>
          <button className='btn-default btn pull-right' onClick={this.closeModal}>x</button>
          <form>
            <div className="form-group">
              <label>Название</label>
              <input value={title} onChange={this.setTitle} className='form-control' placeholder="название продукта"/>
            </div>
            <div className="form-group">
              <label>Цена</label>
              <input value={price} onChange={this.setPrice} className='form-control' placeholder="цена"/>
            </div>
            <div className="form-group">
              <label>Категория</label>
              <input value={category} onChange={this.setCategory} className='form-control'/>
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </Modal>
      </div>
    );
  }
}
