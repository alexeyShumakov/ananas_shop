import React, { PropTypes } from 'react';
import _ from 'lodash';

import ProductsField from './ProductsField';

export default class ProductsFields extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    let { setFieldsValue, createFieldsValue, deleteProductsField, updateProductsField, productsFields, fieldsValue, id } = this.props;
    let product_id = id;
    let fields = productsFields.map( f => {
      let key = id = f.get('id');
      let field = f.get('field');
      let fieldsValues = f.get('fields_values');
      return <ProductsField {...{key, id, product_id, fieldsValue,
        field, fieldsValues, updateProductsField,
        deleteProductsField, setFieldsValue, createFieldsValue}}/>
    })
    return (
      <div className='form-horizontal'>
        {fields}
      </div>
    );
  }
}
