import React, { PropTypes } from 'react';
import _ from 'lodash';

import Loader from './Loader';
import Field from './order/Field';
import ProductsList from './order/ProductsList';

export default class Order extends React.Component {
  constructor(props, context) {
    super(props, context);
    let _this = this;
    this.state = {loading: true};
    _.bindAll(this, 'fetchOrder');
    this.fetchOrder().then(()=> {
      _this.setState({loading: false});
    })
  }

  fetchOrder(){
    let { fetchOrder } = this.props.actions;
    return fetchOrder(this.props.id);
  }
  render() {
    let { actions, store } = this.props;
    let {
      updateOrder, fetchOrder,
      updateAddress, updateLineItem, destroyLineItem } = actions;
    let order = store.get('order');

    let element;
    if (this.state.loading) {
      element = <Loader/>
    } else {
      element =
        <div>
          <span className='pull-right'>{order.get('status')}</span>
          <h3> Заказ #{this.props.id} </h3>
          <hr/>
          <h4>Личные данные</h4>
          <Field
            model={order}
            label='Имя'
            field='name'
            updateModel={updateOrder}
            fetchModel={fetchOrder}
          />
          <Field
            model={order}
            label='Email'
            field='email'
            updateModel={updateOrder}
            fetchModel={fetchOrder}
          />
          <Field
            model={order}
            label='Телефон'
            field='phone'
            updateModel={updateOrder}
            fetchModel={fetchOrder}
          />
          <h4>Адрес</h4>
          <Field
            model={order.get('address')}
            label='Город'
            field='city'
            updateModel={updateAddress}
            fetchModel={fetchOrder}
          />

          <Field
            model={order.get('address')}
            label='Адрес'
            field='address'
            updateModel={updateAddress}
            fetchModel={fetchOrder}
          />
          <h4>Доставка</h4>
          <Field
            model={order}
            label='Цена'
            field='delivery_price'
            updateModel={updateOrder}
            fetchModel={fetchOrder}
          />
          <h4>Продукты</h4>
          <ProductsList
            products={order.get('line_items')}
            fetchOrder={this.fetchOrder}
            destroyLineItem={destroyLineItem}
            updateLineItem={updateLineItem}/>
          <hr/>
          <h3>итого: {order.get('fixed_total_price')} p.</h3>
        </div>
    }
    return (
      <div className='form-horizontal'>
        {element}
      </div>
    );
  }
}
