import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Immutable from 'immutable';

export default class Confirm extends React.Component {

  constructor(props, context) {
    super(props, context);
    let { model, field } = props;
    this.state = { isLoading: false }
    _.bindAll(this, 'confirm');
  }

  confirm() {
    let _this = this;
    let { order, confirmOrder } = this.props;
    _this.setState({ isLoading: true});
    confirmOrder(order).then(() => {
      _this.setState({ isLoading: false});
    }, () => {
      _this.setState({ isLoading: false});
    })
  }

  render() {
    let { isLoading } = this.state;
    let button =
        <button className="btn btn-primary" onClick={this.confirm}>подтвердить заказ</button>
    if (isLoading) {
      button =
        <button className="btn btn-default">обработка...</button>
    }
    return (
      <div className='control-button'>
        {button}
      </div>
    );
  }
}
