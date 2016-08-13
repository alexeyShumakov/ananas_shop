import React, { PropTypes } from 'react';
import _ from 'lodash';
import Select from 'react-select';
import Tooltip from 'rc-tooltip';
import Modal from 'react-modal';

import axios from '../utils/axios';

import Field from './Field';
import NewAdress from './cabinet/NewAddress';

export default class MyProfile extends React.Component {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'updateAddress');
    let { fetchProfile } = props.actions;
    fetchProfile();
  }

  updateAddress(e) {
    let { fetchProfile } = this.props.actions;
    if (e) {
      axios.put(`/api/v1/addresses/${e.value}`, {address: {current: true}}).then(()=> {
        fetchProfile();
      })
    }
  }
  render() {
    let { store, actions } = this.props;
    let profile = store.get('profile');
    let address = store.get('address');
    let { setAddress, createAddress, updateProfile, fetchProfile } = actions;
    let id = profile.get('id');
    let email = profile.get('email');
    let name = profile.get('name');
    let phone = profile.get('phone');
    let form;

    if(!profile.isEmpty()){
      let addresses = profile.get('addresses');
      let options = addresses.map((address) => {
        let value = address.get('id');
        let label = `${address.get('city')}, ${address.get('address')}`;
        return {value, label}
      }).toJS();
      let defaultValue = addresses.find((address)=> {
        return address.get('current');
      })
      if (defaultValue) {
        defaultValue = {
          value: defaultValue.get('id'),
          label: `${defaultValue.get('city')}, ${defaultValue.get('address')}`
        }
      }
      form =
        <div className='form-horizontal'>
          <div className="form-group">
            <label className="col-sm-2 control-label">Клинет ID:</label>
            <div className="col-sm-10">
              <b className="profile__field-value">{id}</b>
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label">E-mail:</label>
            <div className="col-sm-10">
              <i className="profile__field-value">{email}</i>
            </div>
          </div>

          <Field
            label='Ф.И.О.'
            field='name'
            updateModel={updateProfile}
            model={profile}/>

          <Field
            label='Телефон'
            field='phone'
            updateModel={updateProfile}
            model={profile}/>
          <div className="form-group">
            <div className="col-sm-2">
              <label className="control-label pull-right">Адрес:
                <NewAdress {...{address, setAddress, createAddress, fetchProfile}}/>
              </label>
            </div>
            <div className="col-sm-10">
              <Select
                value={defaultValue}
                options={options}
                onChange={this.updateAddress}
                clearable={false}
              />
            </div>
          </div>
        </div>
    }
    return (
      <div>
        {form}
      </div>
    );
  }
}
