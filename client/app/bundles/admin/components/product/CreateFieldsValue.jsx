import React, { PropTypes } from 'react';
import _ from 'lodash';
import Tooltip from 'rc-tooltip';
import Modal from 'react-modal';

export default class CreateFieldsValue extends React.Component {

  constructor(props, context) {
    super(props, context);
    Modal.setAppElement('body');
    this.state = {modal: false};
    _.bindAll(this, 'openModal', 'closeModal', 'createFieldsValue', 'setFieldsValue');
  }

  openModal() {
    this.setState({modal: true});
  }

  closeModal() {
    this.setState({modal: false});
  }
  createFieldsValue() {
    let _this = this;
    let {fieldsValue, createFieldsValue, setFieldsValue, product_id} = this.props;
    createFieldsValue(product_id, fieldsValue).then(()=> {
      let newFieldsValue = fieldsValue.set('title', '');
      _this.setState({modal: false});
      setFieldsValue(newFieldsValue);
    });
  }

  setFieldsValue(e) {
    let {fieldsValue, setFieldsValue, fieldId} = this.props;
    let newFieldsValue = fieldsValue.set('title', e.target.value);
    newFieldsValue = newFieldsValue.set('field_id', fieldId);
    setFieldsValue(newFieldsValue);
  }
  render() {
    let title = this.props.fieldsValue.get('title');
    return(
      <div className='pull-right'>
        <Tooltip
          placement='top'
          trigger='hover'
          overlay={<div>Создать значение св-ва</div>}
          mouseEnterDelay={0}
          mouseLeaveDelay={0.1}>

          <span className="glyphicon glyphicon-plus text-success control-icon" onClick={this.openModal}></span>
        </Tooltip>

        <Modal isOpen={this.state.modal}>
          <button type="button" className="close" aria-label="Close" onClick={this.closeModal}><span aria-hidden="true">&times;</span></button>
          <form>
            <div className="form-group">
              <label className="label-control">Название</label>
              <input className="form-control" value={title} onChange={this.setFieldsValue}/>
            </div>
          </form>
          <button className='btn btn-success' onClick={this.createFieldsValue}>Создать</button>
        </Modal>
      </div>
    );
  }
}
