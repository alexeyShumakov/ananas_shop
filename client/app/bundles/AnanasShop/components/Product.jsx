import React, { PropTypes } from 'react';
import _ from 'lodash';

import AddToButton from './AddToButton';
import PreviewProduct from './PreviewProduct';

export default class Product extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const {
      thumbCoverUrl, title, price,
      addToCart, productId, selectedProductId,
      fetchProduct, product } = this.props;
    return (
      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <div className="thumbnail product-thumb">
          <a href={`/products/${productId}`}>
            <img src={thumbCoverUrl}/>
          </a>
          <PreviewProduct {...{productId, addToCart, selectedProductId, fetchProduct, product}}/>
          <div className="caption">
            <span className="product-thumb__title">
              {title}
            </span>
            <p><b className="product-thumb__price">{price} руб.</b></p>
              <AddToButton {...{addToCart, productId, selectedProductId}} />
          </div>
        </div>
      </div>
    );
  }
}
