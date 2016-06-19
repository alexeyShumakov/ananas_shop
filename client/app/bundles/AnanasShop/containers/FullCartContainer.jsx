
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
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Товар</th>
              <th>Кол-во</th>
              <th>Цена</th>
              <th>Сумма</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {lineItems}
          </tbody>
        </table>
        <hr/>
        <div className="pull-right">
          <h3>
             Итого: {totalPrice} руб.
          </h3>
        </div>
        <div className="clearfix"></div>
        <div className="btn-toolbar">
          <div className="btn-group">
            <button className="btn btn-primary">Войти и заказать</button>
            <button className="btn btn-primary">Зарегистрироваться и заказать</button>
          </div>
          <div className="btn-group">
            <a href="/orders/new" className='btn btn-default'>Быстрая покупка</a>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(select)(FullCartContainer);
