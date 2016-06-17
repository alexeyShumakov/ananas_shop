import React, { PropTypes } from 'react';
import _ from 'lodash';

export default class PrevCartItem extends React.Component {
  static propTypes = {
  }

  deleteItem() {
    const { item, destroyLineItem } = this.props;
    let id = item.get('id');
    destroyLineItem(id);
  }
  constructor(props, context) {
    super(props, context);

    _.bindAll(this, 'deleteItem');
  }

  render() {
    const { item, destroyLineItem } = this.props;
    let count = item.get('count');
    let totalPrice = item.get('total_price');
    let price = item.get('product').get('price');
    let title = item.get('product').get('title');
    let productId = item.get('product').get('id');
    let prevImageUrl = item.get('product').get('thumb_cover_url');
    return (
      <div>
        <a href={`/products/${productId}`}>
          <img src={prevImageUrl} alt=""/>
        </a>
        {count} x {price} = {totalPrice}
        <p>
          {title}
        </p>
        <button onClick={this.deleteItem} className="btn btn-danger">x</button>
        <hr/>
      </div>
    );
  }
}
