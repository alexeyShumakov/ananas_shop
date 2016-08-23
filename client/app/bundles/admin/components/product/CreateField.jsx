import React, { PropTypes } from 'react';
import _ from 'lodash';

import ModalWrapper from '../ModalWrapper';

export default class CreateField extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {modal: false};
    _.bindAll(this, 'createField', 'setField', 'toggleModal');
  }

  toggleModal() {
    this.setState({modal: !this.state.modal});
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
      _this.toggleModal();
    })
  }
  render() {
    let { field } = this.props;
    let title = field.get('title');
    return (
      <div className='control-button'>
        <button className="btn btn-success" onClick={this.toggleModal}>Создать свойство</button>
        <ModalWrapper title='Создать св-во' modal={this.state.modal} toggleModal={this.toggleModal}>
          <form>
            <div className="form-group">
              <label className="label-control">Название</label>
              <input className="form-control" value={title} onChange={this.setField}/>
            </div>
          </form>
          <button className='btn btn-success' onClick={this.createField}>Создать</button>
        </ModalWrapper>
      </div>
    );
  }
}
