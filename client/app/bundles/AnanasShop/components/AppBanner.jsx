import React, { PropTypes } from 'react';
import _ from 'lodash';
import Gallery from 'react-image-gallery';
import axios from 'axios';

export default class AppBanner extends React.Component {

  constructor(props, context) {
    super(props, context);
    let _this = this;
    this.state = { images: null}
    axios.get('/api/v1/banner_items').then((responce) => {
      _this.setState({images: responce.data.banner_items });
    })
  }

  render() {
    let images, gallery;
    if(this.state.images) {
      images = this.state.images.map( i => {
        return {original: i.image}
      })
      gallery = <div> <Gallery items={images} disableArrowKeys={true} showThumbnails={false} showBullets={true} showNav={false} /> </div>
    }
    return (
      <div> {gallery} </div>
    );
  }
}
