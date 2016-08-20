import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import { SketchPicker } from 'react-color';
import Tooltip from 'rc-tooltip';
import Modal from 'react-modal';
import _ from 'lodash';

export default class NewOrdersStatus extends React.Component {
  constructor(props, context) {
    super(props, context);
    Modal.setAppElement('body');
    this.state = {modal: false, errors: Immutable.Map()};
    _.bindAll(this, 'openModal', 'closeModal', 'updateTitle', 'updateColor', 'updatePickerColor', 'create');
  }

  openModal() {
    this.setState({modal: true});
  }

  closeModal() {
    this.setState({modal: false});
  }

  create() {
    let _this = this;
    let { ordersStatus, createOrdersStatus, fetchOrdersStatuses } = this.props;
    createOrdersStatus(ordersStatus).then(()=>{
      fetchOrdersStatuses();
      _this.setState({modal: false});
    }, (responce) => {
      _this.setState({errors: Immutable.fromJS(responce.data)});
    });
  }

  updateTitle(e) {
    let { ordersStatus, setOrdersStatus } = this.props;
    ordersStatus = ordersStatus.set('title', e.target.value);
    setOrdersStatus(ordersStatus);
  }

  updateColor(e) {
    let { ordersStatus, setOrdersStatus } = this.props;
    ordersStatus = ordersStatus.set('color', e.target.value);
    setOrdersStatus(ordersStatus);
  }

  updatePickerColor(e) {
    let { ordersStatus, setOrdersStatus } = this.props;
    ordersStatus = ordersStatus.set('color', e.hex);
    setOrdersStatus(ordersStatus);
  }

  render() {
    let title = this.props.ordersStatus.get('title');
    let color = this.props.ordersStatus.get('color');
    let style = {
      overlay: {
        zIndex: 100,
        overflowY: 'auto'
      }
    }
    return (
      <span>
        <Tooltip
          placement='top'
          trigger='hover'
          overlay={<div>Создать статус</div>}
          mouseEnterDelay={0}
          mouseLeaveDelay={0.1}>
          <span className="glyphicon glyphicon-plus control-icon text-success" onClick={this.openModal}/>
        </Tooltip>
        <Modal
          isOpen={this.state.modal}
          onRequestClose={this.closeModal}
          className='modal-dialog shop__modal'
          style={style}>
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.closeModal}><span>&times;</span></button>
              <h4 className="modal-title"> Новый статус </h4>
            </div>
            <div className="modal-body">
              <div className="form">
                <div className="form-group">
                  <label className="control-label">Название</label>
                  <input className="form-control" value={title} onChange={this.updateTitle}/>
                  <span className="help-text">{this.state.errors.getIn(['title', 0])}</span>
                </div>
                <div className="form-group">
                  <label className="control-label">Цвет</label>
                  <input className="form-control" value={color} onChange={this.updateColor}/>
                  <span className="help-text">{this.state.errors.getIn(['color', 0])}</span>
                  <SketchPicker color={color} onChange={this.updatePickerColor}/>
                </div>
              </div>
              <button className='btn btn-success' onClick={this.create}>Создать</button>
            </div>
          </div>
        </Modal>
      </span>
    );
  }
}
