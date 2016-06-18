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
      <tr>
        <td>
          <a href={`/products/${productId}`}>
            <img src={prevImageUrl} alt=""/>
          </a>
        </td>

        <td>
          {title}
        </td>

        <td>
          {count} x {price}
        </td>
        <td>
           {totalPrice}
        </td>
        <td>
          <button onClick={this.deleteItem} className="btn btn-danger">x</button>
        </td>
      </tr>
    );
  }
}
