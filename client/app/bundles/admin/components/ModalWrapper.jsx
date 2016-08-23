import React, { PropTypes } from 'react';
import _ from 'lodash';

import Modal from 'react-modal';

export default class ModalWrapper extends React.Component {
  constructor(props, context) {
    super(props, context);
    Modal.setAppElement('body');
  }

  render() {
    let { modal, toggleModal, title } = this.props;
    let style = {
      overlay: {
        zIndex: 100,
        overflowY: 'auto'
      }
    };
    return (
      <Modal
        isOpen={modal}
        onRequestClose={toggleModal}
        className='modal-dialog modal-lg shop__modal'
        style={style}>
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" onClick={toggleModal}><span>&times;</span></button>
            <h4 className="modal-title">{title}</h4>
          </div>
          <div className="modal-body">
            {this.props.children}
          </div>
        </div>
      </Modal>
    );
  }
}
