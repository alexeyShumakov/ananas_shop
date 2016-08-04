import React, { PropTypes } from 'react';
import _ from 'lodash';

export default class BannerItems extends React.Component {

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'deleteBanner');
  }

  deleteBanner() {
    let { banner, deleteBanner } = this.props;
    deleteBanner(banner.get('id'));
  }
  render() {
    let { banner } = this.props;
    return (
      <li className='admin-banner-image'>
        <img src={banner.get('image')}/>
        <div className="admin-banner-image__control-block">
            <button className="btn btn-danger" onClick={this.deleteBanner} >
            <span className="glyphicon glyphicon-remove"/>
          </button>
        </div>
      </li>
    );
  }
}
