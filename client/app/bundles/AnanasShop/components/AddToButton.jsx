import React, { PropTypes } from 'react';
import _ from 'lodash';

export default class AddToButton extends React.Component {
  static propTypes = {
    productId: PropTypes.number.isRequired,
    selectedProductId: PropTypes.number.isRequired,
    addToCart: PropTypes.func.isRequired
  };

  isSelected() {
    return this.props.productId === this.props.selectedProductId;
  }

  constructor(props, context) {
    super(props, context);

    _.bindAll(this, 'handleChange');
  }
  handleChange(e) {
    this.props.addToCart(this.props.productId);
  }
  render() {
    var button;
    if (this.isSelected()) {
      button =<a
        href='/my_cart'
        className='button btn btn-success'>
        Go to cart
      </a>
    } else {
      button =<button
                onClick={this.handleChange}
                className='btn btn-primary'>
                Add to cart
              </button>
    }
    return (
      <div>
        {button}
      </div>
    );
  }
}
