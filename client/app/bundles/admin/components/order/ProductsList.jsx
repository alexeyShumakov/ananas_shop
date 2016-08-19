import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import _ from 'lodash';

import Product from './Product';
export default class ProductsList extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    let { products, fetchOrder, updateLineItem, destroyLineItem } = this.props;
    products = products.map((product, i) => {
      return <Product
        fetchOrder={fetchOrder}
        updateLineItem={updateLineItem}
        destroyLineItem={destroyLineItem}
        product={product}
        key={i}/>
    })
    return (
      <div className='line-items'>
        {products}
      </div>
    );
  }
}
