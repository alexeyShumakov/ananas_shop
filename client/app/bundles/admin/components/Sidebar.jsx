import React, { PropTypes } from 'react';
import _ from 'lodash';
import NewModalProduct from './NewModalProduct'

export default class Sidebar extends React.Component {

  constructor(props, context) {
    super(props, context);
  }
  render() {
    let { product, productErrors, categories, setProduct, createProduct, fetchCategories } = this.props;
    return (
      <div>
        <NewModalProduct {...{product, productErrors, categories, setProduct, createProduct, fetchCategories}}/>
      </div>
    );
  }
}
