import React, { PropTypes } from 'react';
import _ from 'lodash';
import Modal from 'react-modal';
import Toggle from 'react-toggle';
import Immutable from 'immutable';

import FormGroup from './cabinet/FormGroup';

export default class Address extends React.Component {
  constructor(props, context) {
    super(props, context);
    let { address } = this.props;
    this.state = {address: address, modal: false, errors: Immutable.Map({})};
    _.bindAll(this, 'openModal', 'closeModal', 'remove', 'update', 'updateTemp', 'toggleDefault');
  }

  openModal() {
    this.setState({modal: true});
  }

  closeModal() {
    this.setState({modal: false});
  }

  toggleDefault(){
    let {address} = this.props;
    let current = address.get('current');
    let newAddress = address.set('current', !current);
    this.setState({address: newAddress});
  }

  remove() {
    let { address, destroyAddress, fetchProfile } = this.props;
    destroyAddress(address.get('id')).then(() => {
      fetchProfile();
    });
  }

  update() {
    let _this = this;
    let { updateAddress, fetchProfile } = this.props;
    let newAddress = this.state.address;
    let id = newAddress.get('id');
    updateAddress(id, newAddress).then(() => {
      _this.closeModal();
      _this.setState({errors: Immutable.Map()});
      fetchProfile();
    }, (errors) => {
      errors = Immutable.fromJS(errors.data);
      _this.setState({errors: errors});
    });
  }

  updateTemp(obj){
    this.setState({address: obj});
  }

  render() {
    let style = {
      overlay: {
        zIndex: 100,
        overflowY: 'auto'
      }
    }
    let { address } = this.props;
    let city = address.get('city');
    let street = address.get('address');
    let current = address.get('current');
    let tempAddress = this.state.address;
    let errors = this.state.errors;
    if (current) {
      current = <span className="glyphicon glyphicon-ok text-success"/>
    } else {
      current = null;
    }
    return (
      <li>
        {current} {city}, {street}
        <div className="control-block">
          <span onClick={this.openModal} className="glyphicon glyphicon-pencil text-primary control-icon"/>
          <span onClick={this.remove} className="glyphicon glyphicon-remove text-danger control-icon"/>

        <Modal
          isOpen={this.state.modal}
          onRequestClose={this.closeModal}
          className='modal-dialog shop__modal'
          style={style}>
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.closeModal}><span>&times;</span></button>
              <h4 className='modal-title'>изменить адрес</h4>
            </div>
            <div className="modal-body">
              <div className="form">
                <FormGroup label='Город' field='city' object={tempAddress} errors={errors} update={this.updateTemp}/>
                <FormGroup label='Адрес' field='address' object={tempAddress} errors={errors} update={this.updateTemp}/>
                <b>Текущий адрес:</b> <Toggle defaultChecked={tempAddress.get('current')} onChange={this.toggleDefault}/>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-primary" onClick={this.update}>изменить адерс</button>
            </div>
          </div>
        </Modal>
        </div>
      </li>
    );
  }
}
