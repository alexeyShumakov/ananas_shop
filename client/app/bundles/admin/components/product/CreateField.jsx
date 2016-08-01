import React, { PropTypes } from 'react';
import _ from 'lodash';

import Modal from 'react-modal';

export default class CreateField extends React.Component {
  constructor(props, context) {
    super(props, context);
    Modal.setAppElement('body');
    this.state = {modal: false};
    _.bindAll(this, 'openModal', 'closeModal', 'createField', 'setField');
  }

  openModal() {
    this.setState({modal: true});
  }

  closeModal() {
    this.setState({modal: false});
  }

  setField(e) {
    let { field, setField } = this.props;
    let newField = field.set('title', e.target.value);
    setField(newField);
  }

  createField() {
    let _this = this;
    let { field, createField } = this.props;
    createField(field).then(()=> {
      _this.setState({modal: false});
    })
  }
  render() {
    let { field } = this.props;
    let title = field.get('title');
    return (
      <div>
        <button className="btn btn-success" onClick={this.openModal}>Создать свойство</button>
        <Modal isOpen={this.state.modal}>
          <button className='btn-default btn pull-right' onClick={this.closeModal}>x</button>
          <form>
            <div className="form-group">
              <label className="label-control">Название</label>
              <input className="form-control" value={title} onChange={this.setField}/>
            </div>
          </form>
          <button className='btn btn-success' onClick={this.createField}>Создать</button>
        </Modal>
      </div>
    );
  }
}
