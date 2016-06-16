
import React, { PropTypes } from 'react';
import Cart from '../components/Cart';
import { connect } from 'react-redux';
import Immutable from 'immutable';

function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  // Note the use of `$$` to prefix the property name because the value is of type Immutable.js
  return { $$cartStore: state.$$cartStore };
}

// Simple example of a React "smart" component
class CartContainer extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,

    $$cartStore: PropTypes.instanceOf(Immutable.Map).isRequired,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { dispatch, $$cartStore } = this.props;
    const count = $$cartStore.get('cart').get('total_count');

    return (
      <Cart {...{ count }} />
    );
  }
}

export default connect(select)(CartContainer);
