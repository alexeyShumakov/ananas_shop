import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import _ from 'lodash';

export default class PrevCartItem extends React.Component {
  static propTypes = {
    item: PropTypes.instanceOf(Immutable.Map).isRequired
  }

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { item } = this.props;
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
        <td> {title} </td>
        <td> {count} x {price} </td>
        <td> {totalPrice} </td>
      </tr>
    );
  }
}
