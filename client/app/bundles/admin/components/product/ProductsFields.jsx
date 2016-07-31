import React, { PropTypes } from 'react';
import _ from 'lodash';

import ProductsField from './ProductsField';

export default class ProductsFields extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    let {updateProductsField, productsFields, id} = this.props;
    let fields = productsFields.map( f => {
      let key = id = f.get('id');
      let field = f.get('field');
      let fieldsValues = f.get('fields_values');
      return <ProductsField {...{key, id, field, fieldsValues, updateProductsField}}/>
    })
    return (
      <div className='form-horizontal'>
        {fields}
      </div>
    );
  }
}
