import React, { PropTypes } from 'react';
import _ from 'lodash';
import NewModalProduct from './NewModalProduct'

export default class Sidebar extends React.Component {

  constructor(props, context) {
    super(props, context);
  }
  render() {
    let { product, setProduct } = this.props;
    return (
      <div>
        <NewModalProduct {...{product, setProduct}}/>
      </div>
    );
  }
}
