import React, { PropTypes } from 'react';
import _ from 'lodash';
import axios from '../utils/axios';

import Image from './product/Image'

export default class Sidebar extends React.Component {

  constructor(props, context) {
    super(props, context);
    props.fetchProduct(props.id);
    _.bindAll(this, 'uploadImage');
  }

  uploadImage(event) {
    let formData = new FormData();
    formData.append('picture[product_id]', this.props.id);
    formData.append('picture[image]', event.target.files[0]);
    this.props.createPicture(formData);
  }
  render() {
    let { product, productLoading, deletePicture } = this.props;
    let price = product.get('price');
    let title = product.get('title');
    let pictures = product.get('pictures');
    let productElem;

    if (productLoading) {
      productElem = <div className="loader"></div>
    } else {
      pictures = pictures.map( pic => {
        return <Image key={pic.get('id')} picture={pic} deletePicture={deletePicture}/>
      })
      productElem =
        <div>
            {pictures}
          <ul>
            <li><b>title:</b>{title}</li>
            <li><b>price:</b>{price}</li>
          </ul>
          <input type='file' onChange={this.uploadImage}/>
        </div>
    }
    return (
      <div>
        {productElem}
      </div>
    );
  }
}
