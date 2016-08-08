import React, { PropTypes } from 'react';
import _ from 'lodash';

import Field from './Field';

export default class MyProfile extends React.Component {
  constructor(props, context) {
    super(props, context);
    let { fetchProfile } = props.actions;
    fetchProfile();
  }
  render() {
    let profile = this.props.store.get('profile');
    let id = profile.get('id');
    let email = profile.get('email');
    let name = profile.get('name');
    let phone = profile.get('phone');
    let updateProfile = this.props.actions.updateProfile;
    let form;
    if(!profile.isEmpty()){
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
        </div>
    }
    return (
      <div>
        {form}
      </div>
    );
  }
}
