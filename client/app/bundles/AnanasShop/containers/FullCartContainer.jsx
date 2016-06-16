
import React, { PropTypes } from 'react';
import LineItem from '../components/fullCart/LineItem';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { bindActionCreators } from 'redux';
import * as cartActionCreators from '../actions/cartActionCreators';

function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  // Note the use of `$$` to prefix the property name because the value is of type Immutable.js
  return { $$cartStore: state.$$cartStore };
}

// Simple example of a React "smart" component
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
    const cart = $$cartStore.get('cart');
    const lineItems = cart.get('line_items');
    const totalPrice = cart.get('total_price');

    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>count</th>
              <th>price</th>
              <th>sum</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {lineItems.map(function(lineItem){
              return <LineItem key={lineItem.get('id')}
                               data={lineItem}
                               updateLineItem={updateLineItem}
                               destroyLineItem={destroyLineItem}/>;
            })}
          </tbody>
        </table>

        <hr/>

        <a href="/orders/new" className='btn btn-success btn-lg'>process to order</a>
        <div className="pull-right">
          <h3>
            total price: {totalPrice}
          </h3>
        </div>
      </div>
    );
  }
}

export default connect(select)(FullCartContainer);
