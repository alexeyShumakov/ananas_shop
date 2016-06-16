
import React, { PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import _ from 'lodash';

export default class LineItem extends React.Component {
  static propTypes = {
    updateLineItem: PropTypes.func,
    destroyLineItem: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);

    _.bindAll(this, 'handleChange', 'destroyLI');
  }

  destroyLI(){
    const lineItem = this.props.data;
    const id = lineItem.get('id');
    this.props.destroyLineItem(id);
  }
  handleChange(e) {
    const lineItem = this.props.data;
    const id = lineItem.get('id');
    const count = e.target.value;
    this.props.updateLineItem(id, count);
  }

  render() {
    const lineItem = this.props.data;
    const lineItemTotalPrice = lineItem.get('total_price');
    const count = lineItem.get('count');

    const product = lineItem.get('product');
    const productName = product.get('name');
    const productPrice = product.get('price');
    const cover = product.get('cover').get('thumb');

    const productId = product.get('id');
    const productLink = `/products/${productId}`;

    return (
      <tr>
        <td> 
          <a href={productLink}>
            <img src={cover} className='my-cart__thumb img-rounded'/>
          </a>
        </td>
        <td> {productName} </td>
        <td>
          <Input
            type="number"
            className='form-control my-cart__count-input'
            value={count}
            onChange={this.handleChange}
            />
        </td>
        <td> {productPrice} </td>
        <td> {lineItemTotalPrice}</td>
        <td> <button  onClick={this.destroyLI} className="btn btn-default btn-sm"><span className="glyphicon glyphicon-remove"></span></button>  </td>
      </tr>
    );
  }
}
