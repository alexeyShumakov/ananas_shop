import React, { PropTypes } from 'react';
import _ from 'lodash';
import LazyLoad from 'react-lazyload';

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
      <div className="product-thumb col-xs-6 col-sm-6 col-md-4 col-lg-3">
        <div className="center-block product-thumb__img-block">
          <a href={`/products/${productId}`}>
            <LazyLoad height={200}>
              <img src={thumbCoverUrl}/>
            </LazyLoad>
          </a>
          <AddToButton {...{addToCart, productId, selectedProductId}} />

          <div>
            <span className="product-thumb__title">
              {title}
            </span>
            <p><b className="product-thumb__price">{price} руб.</b></p>
          </div>
        </div>
        <PreviewProduct {...{productId, addToCart, selectedProductId, fetchProduct, product}}/>
      </div>
    );
  }
}
