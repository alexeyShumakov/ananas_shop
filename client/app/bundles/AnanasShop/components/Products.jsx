import React, { PropTypes } from 'react';
import _ from 'lodash';

import Product from './Product'

export default class Products extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    let selectedProductId = this.props.selectedProductId;
    let addToCart = this.props.addToCart;
    let products = this.props.products.map((product)=>{
      let title = product.get('title');
      let productId = product.get('id');
      let price = product.get('price');
      let thumbCoverUrl = product.get('thumb_cover_url')
      return <Product key={productId} {...{productId, title, price, thumbCoverUrl, selectedProductId, addToCart}}/>
    });
    return (
      <div className="products-grid">
        {products}
      </div>
    );
  }
}
