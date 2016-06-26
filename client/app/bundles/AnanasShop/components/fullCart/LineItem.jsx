
import React, { PropTypes } from 'react';
import { FormControl } from 'react-bootstrap';
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
    const productTitle = product.get('title');
    const productPrice = product.get('price');
    const cover = product.get('thumb_cover_url');

    const productId = product.get('id');
    const productLink = `/products/${productId}`;

    return (
      <div>
        <hr/>
        <div className='row'>
          <div className="col-sm-3 col-xs-5 text-center">
            <a href={productLink}>
              <img src={cover} className='my-cart__thumb img-rounded'/>
            </a>
          </div>
          <div className="col-sm-5 col-xs-7">
            <p> {productTitle} </p>
            <p> <b>Цена: </b>{productPrice} руб. </p>
            <p> <b>Кол-во: </b>
              <FormControl
                type="number"
                className='form-control my-cart__count-input'
                value={count}
                onChange={this.handleChange}
                />
            </p>
          </div>
          <div className="col-sm-4 col-xs-12">
            <h4>
              <b>{lineItemTotalPrice} руб.  </b>
              <span className="my-cart__remove-line-item glyphicon glyphicon-remove pull-right" onClick={this.destroyLI} ></span>
            </h4>
          </div>
        </div>
      </div>
    );
  }
}
