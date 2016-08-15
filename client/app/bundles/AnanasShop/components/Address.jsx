import React, { PropTypes } from 'react';
import _ from 'lodash';

export default class Address extends React.Component {
  constructor(props, context) {
    super(props, context);
    let { address } = this.props;
    this.state = {address};
    _.bindAll(this, 'remove');
  }

  remove() {
    let { address, destroyAddress, fetchProfile } = this.props;
    destroyAddress(address.get('id')).then(() => {
      fetchProfile();
    });

  }
  render() {
    let { address } = this.props;
    let city = address.get('city');
    let street = address.get('address');
    let current = address.get('current');
    if (current) {
      current = <span className="glyphicon glyphicon-ok text-success"/>
    } else {
      current = null;
    }
    return (
      <li>
        {current} {city}, {street}
        <div className="control-block">
          <span className="glyphicon glyphicon-pencil text-primary control-icon"/>
          <span onClick={this.remove} className="glyphicon glyphicon-remove text-danger control-icon"/>
        </div>
      </li>
    );
  }
}
