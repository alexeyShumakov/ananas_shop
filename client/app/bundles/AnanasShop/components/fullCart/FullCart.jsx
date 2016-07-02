import React, { PropTypes } from 'react';
import LineItem from './LineItem';

export default class FullCart extends React.Component {
  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { updateLineItem, destroyLineItem, cart, cartLoadingState } = this.props;
    let totalPrice = cart.get('total_price');
    let lineItems;

    if (!cartLoadingState) {
      lineItems = cart.get('line_items').map(function(lineItem){
        return <LineItem key={lineItem.get('id')}
                         data={lineItem}
                         updateLineItem={updateLineItem}
                         destroyLineItem={destroyLineItem}/>
      });
    }

    return (
      <div>
        {lineItems}
        <div className="col-sm-12 my-cart__total-amount">
          <h3 className='text-right'>
             Итого: <b className='my-cart__total-price'>{cart.get('total_price')} руб.</b>
          </h3>
        </div>
      </div>
    );
  }
}
