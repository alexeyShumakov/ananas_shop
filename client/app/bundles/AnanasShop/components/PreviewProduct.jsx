
import React, { PropTypes } from 'react';
import _ from 'lodash';
import Modal from 'react-modal';

import FullProduct from './FullProduct';

export default class PreviewProduct extends React.Component {

  constructor(props, context) {
    super(props, context);
    Modal.setAppElement('body');
    this.state = {modal: false};
    _.bindAll(this, 'openModal', 'closeModal');
  }

  openModal() {
    this.setState({modal: true});
  }

  closeModal() {
    this.setState({modal: false});
  }

  render() {
    let { productId, fetchProduct, product, addToCart, selectedProductId } = this.props;
    let style = {
      overlay: {
        zIndex: 100,
        overflowY: 'auto'
      }
    }
    return (
      <div>
        <button className='hidden-xs btn btn-success btn-sm preview-product__show-button' onClick={this.openModal}>Быстрый просмотр</button>
        <Modal isOpen={this.state.modal} className='modal-dialog modal-lg shop__modal' style={style}>
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.closeModal}><span>&times;</span></button>
              <h4 className="modal-title"> {product.get('title')} </h4>
            </div>
            <div className="modal-body">
              <FullProduct {...{productId, fetchProduct, product, addToCart, selectedProductId}}/>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
