import React, { PropTypes } from 'react';
import _ from 'lodash';

import ImageList from './product/ImageList';

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
    let { product, productLoading, deletePicture, updatePicture } = this.props;
    let price = product.get('price');
    let title = product.get('title');
    let pictures = product.get('pictures');
    let productElem;

    if (productLoading) {
      productElem = <div className="loader"></div>
    } else {
      productElem =
        <div>
          <div>Добавить изобр:<input type='file' onChange={this.uploadImage}/></div>
          <hr/>
          <ImageList {...{pictures, deletePicture, updatePicture}}/>
          <hr/>
          <ul>
            <li><b>title:</b>{title}</li>
            <li><b>price:</b>{price}</li>
          </ul>
        </div>
    }
    return (
      <div>
        {productElem}
      </div>
    );
  }
}
