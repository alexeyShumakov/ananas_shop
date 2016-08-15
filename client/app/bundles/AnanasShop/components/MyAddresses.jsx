import React, { PropTypes } from 'react';
import _ from 'lodash';

import Address from './Address';
import NewAddress from './cabinet/NewAddress';

export default class MyAddresses extends React.Component {
  constructor(props, context) {
    super(props, context);
    let { fetchProfile } = props.actions;
    fetchProfile();
  }
  render() {
    let { store, actions } = this.props;
    let newAddress = store.get('address');
    let addresses = store.getIn(['profile', 'addresses']);
    let {updateAddress, destroyAddress, fetchProfile, setAddress, createAddress} = actions;
    if (addresses) {
      addresses = addresses.map((address, key) => {
        return <Address {...{key, address, updateAddress, destroyAddress, fetchProfile}} />
      });
    }
    return (
      <div>
          <div className="pull-left">
            <h4>
              Ваши адреса:
              <NewAddress address={newAddress} {...{setAddress, createAddress, fetchProfile}}/>
            </h4>
          </div>
          <div className="clearfix"/>
        <ol>
          {addresses}
        </ol>
      </div>
    );
  }
}
