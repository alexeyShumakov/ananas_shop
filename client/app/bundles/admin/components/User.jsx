import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import Select from 'react-select';
import _ from 'lodash';

export default class User extends React.Component {

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'updateUser');
    let _this = this;
    this.state = {roleOptions: [], defaultRole: 'regular'};
    props.actions.fetchUser(props.id);
    props.actions.fetchUsersRoles().then((resp)=> {
      let roles = Immutable.fromJS(resp.data);
      let roleOptions = []
      roles.forEach((value, label) => {
        roleOptions.push({value: label, label: label});
      })
      _this.setState({roleOptions});
    });
  }

  updateUser(e) {
    let user = this.props.store.get('user');
    let newUser = user.set('role', e.value);
    this.props.actions.updateUser(newUser).then();
  }
  render() {
    let { roleOptions, defaultRole } = this.state;
    let role = this.props.store.getIn(['user', 'role']) || defaultRole;
    let value = { value: role, label: role};
    return (
      <div>
        <dl className="dl-horizontal">
          <dt> <label>Роль</label> </dt>
          <dd>
            <Select
              name="form-control"
              clearable={false}
              value={value}
              options={roleOptions}
              onChange={this.updateUser}
            />
          </dd>
        </dl>
      </div>
    );
  }
}
