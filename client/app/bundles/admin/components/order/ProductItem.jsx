import React, { PropTypes } from 'react';
import _ from 'lodash';
import Immutable from 'immutable';

export default class ProductItem extends React.Component {

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'createLineItem');
  }

  createLineItem() {
    let { product, order, fetchOrder, createLineItem, closeModal } = this.props;
    let params = {
      order_id: order.get('id'),
      product_id: product.get('id'),
      fixed_price: product.get('price')
    }
    createLineItem(params).then(()=> {
      fetchOrder(order.get('id'));
      closeModal();
    })
  }

  render() {
    let { product } = this.props;
    let image = product.get('pictures').find((pic) => {
      return pic.get('is_hover');
    }) || product.getIn(['pictures', 0]);
    if (image) {
      image = image.get('thumb');
    } else {
      image = product.get('default_thumb_cover_url');
    }
    let title = product.get('title');
    let price = product.get('price');
    return (
      <div className='row line-item'>
        <div className="col-sm-2">
          <img src={image}/>
        </div>
        <div className="col-sm-6">
          <ul className='list-unstyled'>
            <li> <h4> {title} </h4> </li>
            <li> {price} p.  </li>
          </ul>
        </div>
        <div className="col-sm-4">
          <button className="btn btn-link" onClick={this.createLineItem}>добавить</button>
        </div>
      </div>
    );
  }
}
