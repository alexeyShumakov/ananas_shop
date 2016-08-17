import React, { PropTypes } from 'react';
import _ from 'lodash';
import Immutable from 'immutable';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Select from 'react-select';

import FormGroup from './order/HFormGroup';

export default class NewOrder extends React.Component {
  constructor(props, context) {
    super(props, context);
    let _this = this;
    this.state = {errors: Immutable.Map(), selectedAddress: {value: null, label: null}, selectedTab: 1};
    let { store, actions } = props;
    let { fetchProfile, setOrder } = actions;
    _.bindAll(this, 'handleSelect', 'updateAddress',
              'updateOrder', 'setSelectedAddress',
              'updateFormAddress', 'createOrder');
    fetchProfile().then((profile)=>{
      if(profile) {
        let addresses = profile.get('addresses');
        let address = addresses.find((address)=> {
          return address.get('current');
        });
        let selectedTab = address ? 0 : 1;
        _this.setState({selectedTab});
        address = address || Immutable.fromJS({city: '', address: ''});

        let name = profile.get('name');
        let phone = profile.get('phone');
        let email = profile.get('email');
        let order = Immutable.fromJS({name, phone, email, address});
        _this.setSelectedAddress(address);
        setOrder(order);
      }
    })
  }

  createOrder() {
    let _this = this;
    let { store, actions } = this.props;
    let order = store.get('order');
    actions.createOrder(order).then(()=> {
      window.location= '/my_cabinet';
    }, (errors) => {
      _this.setState({errors: Immutable.fromJS(errors.data)});
    })
  }
  updateAddress(address) {
    let { store, actions } = this.props;
    let order = store.get('order');
    address = store.getIn(['profile', 'addresses']).find( (a) => {
      return a.get('id') == address.value;
    })
    order = order.set('address', address);
    this.updateOrder(order);
    this.setSelectedAddress(address);
  }

  updateFormAddress(address) {
    let { store, actions } = this.props;
    let { setOrder } = actions;
    let order = store.get('order').set('address', address);
    setOrder(order);
  }

  setSelectedAddress(address) {
    let label = '';
    if (address.get('city')) {
      label = `${address.get('city')}, ${address.get('address')}`;
    }
    address = {
      value: address.get('id'),
      label: label
    }
    this.setState({selectedAddress: address});
  }

  updateOrder(newOrder) {
    let { setOrder } = this.props.actions;
    setOrder(newOrder);
  }

  handleSelect(index, last) {
    this.setState({selectedTab: index});
    let { store, actions } = this.props;
    let address = Immutable.fromJS({city: '', address: ''});
    let order = store.get('order');
    if(index == 0) {
      let addresses = store.getIn(['profile', 'addresses']);
      let currentAddress = addresses.find((address)=> {
        return address.get('current');
      });
      if(currentAddress) {
        address = currentAddress;
        this.setSelectedAddress(currentAddress);
      }
    }
    order = order.set('address', address);
    this.updateOrder(order);
  }

  render() {
    let orderElement, tabs, tabIndex, addresses, options;
    let { selectedAddress, errors } = this.state;

    let { store, actions } = this.props;
    let order = store.get('order');
    let profile = store.get('profile');
    let address = order.get('address');
    let addressForm =
      <div>
        <FormGroup label='Город' field='address.city' object={order} errors={errors} update={this.updateFormAddress}/>
        <FormGroup label='Адрес' field='address.address' object={order} errors={errors} update={this.updateFormAddress}/>
      </div>

    if (!profile.isEmpty()) {
      addresses = profile.get('addresses');
      options = addresses.map((address) => {
        let value = address.get('id');
        let label = `${address.get('city')}, ${address.get('address')}`;
        return {value, label}
      }).toJS();
      tabs =
        <Tabs onSelect={this.handleSelect} selectedIndex={this.state.selectedTab} >
          <TabList>
            <Tab>Выбрать адрес</Tab>
            <Tab>Новый адрес</Tab>
          </TabList>

          <TabPanel>
            <Select
              value={selectedAddress}
              options={options}
              onChange={this.updateAddress}
              clearable={false}
            />
          </TabPanel>
          <TabPanel>
            {addressForm}
          </TabPanel>
        </Tabs>
    } else {
      tabs =
        <div>
          <h4>Ваш адрес</h4>
          {addressForm}
        </div>
    }
    orderElement =
      <div className='form form-horizontal'>
        <h4>Ваши личные данные</h4>
        <FormGroup label='Имя' field='name' object={order} errors={errors} update={this.updateOrder}/>
        <FormGroup label='E-mail' field='email' object={order} errors={errors} update={this.updateOrder}/>
        <FormGroup label='Телефон' field='phone' object={order} errors={errors} update={this.updateOrder}/>
        <hr/>
        {tabs}
      </div>

    return (
      <div>
        {orderElement}
        <div className="row margin-top-20">
          <div className="col-xs-4 order__back-button">
            <a href="/my_cart" className='btn btn-default'>В корзину</a>
          </div>
          <div className="col-xs-8">
            <div className="btn btn-primary btn-lg pull-right" onClick={this.createOrder}>Оформить заказ</div>
          </div>
        </div>
      </div>
    );
  }
}
