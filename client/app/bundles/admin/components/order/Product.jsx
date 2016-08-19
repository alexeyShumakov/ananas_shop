import React, { PropTypes } from 'react';
import _ from 'lodash';
import { FormControl } from 'react-bootstrap';
import Immutable from 'immutable';

export default class Product extends React.Component {

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'updateLineItem', 'destroyLI');
  }

  destroyLI() {
    let { destroyLineItem, fetchOrder, product } = this.props;
    destroyLineItem(product.get('id')).then(() => {
      fetchOrder();
    });
  }

  updateLineItem(e) {
    let { updateLineItem, destroyLineItem, fetchOrder, product } = this.props;
    updateLineItem(product.get('id'), {count: e.target.value}).then(() => {
      fetchOrder();
    });
  }

  render() {
    let { product } = this.props;
    let imageUrl = product.getIn(['product', 'thumb_cover_url']);
    let title = product.getIn(['product', 'title']);
    return (
      <div className='row line-item'>
        <div className="col-sm-2">
          <img src={imageUrl}/>
        </div>
        <div className="col-sm-10">
          <ul className='list-unstyled'>
            <li>
              <h4>
                {title} <span className="pull-right glyphicon glyphicon-remove control-icon text-danger" onClick={this.destroyLI}/>
              </h4>
            </li>
            <li>
              <FormControl
                type="number"
                className='form-control my-cart__count-input'
                value={product.get('count')}
                onChange={this.updateLineItem}
                /> x {product.get('fixed_price')} p.
            </li>
            <li>
              <h4>
                <b> {product.get('fixed_total_price')} p.</b>
              </h4>
            </li>
            <li>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
