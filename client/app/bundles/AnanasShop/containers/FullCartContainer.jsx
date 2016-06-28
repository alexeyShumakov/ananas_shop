import React, { PropTypes } from 'react';
import LineItem from '../components/fullCart/LineItem';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { bindActionCreators } from 'redux';
import * as cartActionCreators from '../actions/cartActionCreators';

function select(state) {
  return { $$cartStore: state.$$cartStore };
}

class FullCartContainer extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,

    $$cartStore: PropTypes.instanceOf(Immutable.Map).isRequired,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { dispatch, $$cartStore } = this.props;
    const actions = bindActionCreators(cartActionCreators, dispatch);
    const { updateLineItem, destroyLineItem } = actions;
    const cartLoadingState = $$cartStore.get('isCartLoading');
    let totalPrice;
    let lineItems;
    if (!cartLoadingState) {
      const cart = $$cartStore.get('cart');
      totalPrice = cart.get('total_price');
      lineItems = cart.get('line_items');
      lineItems = lineItems.map(function(lineItem){
        return <LineItem key={lineItem.get('id')}
                         data={lineItem}
                         updateLineItem={updateLineItem}
                         destroyLineItem={destroyLineItem}/>});
    }

    return (
      <div>
        {lineItems}
        <div className="col-sm-12 my-cart__total-amount">
          <h3 className='text-right'>
             Итого: <b className='my-cart__total-price'>{totalPrice} руб.</b>
          </h3>
        </div>
      </div>
    );
  }
}

export default connect(select)(FullCartContainer);
