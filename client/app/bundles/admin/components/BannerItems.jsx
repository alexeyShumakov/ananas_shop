import React, { PropTypes } from 'react';
import _ from 'lodash';

import BannerItem from './BannerItem';

export default class BannerItems extends React.Component {

  constructor(props, context) {
    super(props, context);
    let { fetchBanners } = this.props.actions;
    fetchBanners();
    this.state = {imageLoading: false};
    _.bindAll(this, 'uploadImage');
  }

  uploadImage(event) {
    let _this = this;
    let formData = new FormData();
    formData.append('banner_item[image]', event.target.files[0]);
    if (event.target.files[0]) {
      this.setState({imageLoading: true});
      this.props.actions.createBanner(formData).then(() => {
        _this.setState({imageLoading: false});
      })
    }
  }
  render() {
    let imageLoading = this.state.imageLoading ? 'loading' : null;
    let deleteBanner = this.props.actions.deleteBanner;
    let bannerItems = this.props.store.get('bannerItems');
    bannerItems = bannerItems.map( (banner, key) => {
      return <BannerItem {...{key, banner, deleteBanner }}/>;
    })
    return (
      <div>
        Добавить изобр: {imageLoading}
        <input type='file' onChange={this.uploadImage}/>
        <ul className='list-unstyled'>
          {bannerItems}
        </ul>
      </div>
    );
  }
}
