import React, { PropTypes } from 'react';
import _ from 'lodash';
import Select from 'react-select';
import Tooltip from 'rc-tooltip';
import Modal from 'react-modal';
import Immutable from 'immutable';

export default class NewAddress extends React.Component {
  constructor(props, context) {
    super(props, context);
    Modal.setAppElement('body');
    this.state = { modal: false, errors: null };
    _.bindAll(this, 'openModal', 'closeModal', 'createAddress', 'setCity', 'setStreet');
  }

  openModal() {
    this.setState({modal: true});
  }

  closeModal() {
    this.setState({modal: false});
  }

  createAddress() {
    let { address, setAddress, createAddress, fetchProfile } = this.props;
    let _this = this;
    createAddress(address).then(()=>{
      let emptyAddress = address.set('city', '').set('address', '');
      setAddress(emptyAddress);
      fetchProfile();
      _this.setState({modal: false, errors: null});
    }, (errors)=> {
      _this.setState({errors: errors.data});
    })
  }

  setCity(e) {
    let { address, setAddress } = this.props;
    let newAddress =  address.set('city', e.target.value);
    setAddress(newAddress);
  }

  setStreet(e) {
    let { address, setAddress } = this.props;
    let newAddress =  address.set('address', e.target.value);
    setAddress(newAddress);
  }

  render() {
    let { address, setAddress, createAddress } = this.props;
    let { errors } = this.state;
    let city = address.get('city');
    let street = address.get('address');
    let cityError, streetError;
    let style = {
      overlay: {
        zIndex: 100,
        overflowY: 'auto'
      }
    }
    if (errors) {
      if (errors.address) {
        streetError = <p className="help-block">{errors.address[0]}</p>
      }
      if (errors.city) {
        cityError = <p className="help-block">{errors.city[0]}</p>
      }
    }
    return (
      <div className='pull-right'>
        <Tooltip
          placement='top'
          trigger='hover'
          overlay={<p>Создать новый адрес</p>}
          mouseEnterDelay={0}
          mouseLeaveDelay={0.1}>

          <span className="glyphicon glyphicon-plus text-success control-icon" onClick={this.openModal}></span>
        </Tooltip>

        <Modal
          isOpen={this.state.modal}
          onRequestClose={this.closeModal}
          className='modal-dialog shop__modal'
          style={style}>
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.closeModal}><span>&times;</span></button>
            </div>
            <div className="modal-body">
              <div className="form">
                <div className={cityError ? 'form-group has-error' : 'form-group'}>
                  <label className='control-label'>Город</label>
                  <input className="form-control" placeholder='Челябинск' value={city} onChange={this.setCity}/>
                  {cityError}
                </div>
                <div className={streetError ? 'form-group has-error' : 'form-group'}>
                  <label className='control-label'>Адрес</label>
                  <input className="form-control" placeholder='ул. Ленина д. 44 кв. 9' value={street} onChange={this.setStreet}/>
                  {streetError}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-primary" onClick={this.createAddress}>создать адерс</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
