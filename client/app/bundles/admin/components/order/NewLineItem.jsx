import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import _ from 'lodash';

import Filters from './Filters';
import ProductItem from './ProductItem';

export default class NewLineItem extends React.Component {

  constructor(props, context) {
    super(props, context);
    Modal.setAppElement('body');
    this.state = {modal: false};
    _.bindAll(this, 'openModal', 'closeModal');
  }

  openModal() {
    this.props.actions.fetchData();
    this.setState({modal: true});
  }

  closeModal() {
    this.setState({modal: false});
  }

  render() {
    let { store, actions } = this.props;
    let { updateFilter, fetchData, fetchOrder, createLineItem } = actions;
    let filters = store.get('filters');
    let products = store.get('products');
    let order = store.get('order')
    products = products.map((product, key) => {
      return <ProductItem
        key={key}
        closeModal={this.closeModal}
        product={product}
        order={order}
        createLineItem={createLineItem}
        fetchOrder={fetchOrder}/>
    })
    let style = {
      overlay: {
        zIndex: 100,
        overflowY: 'auto'
      }
    }
    return (
      <span>
        <span className="glyphicon glyphicon-plus text-success control-icon" onClick={this.openModal}/>
        <Modal
          isOpen={this.state.modal}
          onRequestClose={this.closeModal}
          className='modal-dialog modal-lg shop__modal'
          style={style}>
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.closeModal}><span>&times;</span></button>
              <h4 className="modal-title">Добавить продукт </h4>
            </div>
            <div className="modal-body">
              <Filters {...{filters, updateFilter, fetchData}} >
                <ul className='list-unstyled'>
                  {products}
                </ul>
              </Filters>
            </div>
          </div>
        </Modal>
      </span>
    );
  }
}
