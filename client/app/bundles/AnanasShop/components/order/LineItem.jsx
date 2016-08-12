import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import _ from 'lodash';

export default class LineItem extends React.Component {
  constructor(props, context) {
    super(props, context);
  }


  render() {
    const { lineItem } = this.props;
    const lineItemTotalPrice = lineItem.get('total_price');
    const count = lineItem.get('count');

    const product = lineItem.get('product');
    const productTitle = product.get('title');
    const productPrice = product.get('price');
    const cover = product.get('thumb_cover_url');

    const productId = product.get('id');
    const productLink = `/products/${productId}`;

    return (
      <div className='my-cart__line-item'>
        <hr/>
        <div className='row'>
          <div className="col-sm-3 col-xs-5 text-center">
            <a href={productLink}>
              <img src={cover} className='my-cart__thumb img-rounded'/>
            </a>
          </div>
          <div className="col-sm-5 col-xs-7">
            <p> {productTitle} </p>
            <p className='line-item__product-price'> <b>Цена: </b>{productPrice} руб. </p>
            <p> <b>Кол-во: </b> {count} </p>
          </div>
          <div className="col-sm-4 col-xs-12">
            <h4> {lineItemTotalPrice} руб. </h4>
          </div>
        </div>
      </div>
    );
  }
}
