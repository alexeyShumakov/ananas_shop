import React, { PropTypes } from 'react';
import _ from 'lodash';

import ImageList from './product/ImageList';
import Field from './product/Field';

export default class Sidebar extends React.Component {

  constructor(props, context) {
    super(props, context);
    props.fetchProduct(props.id);
    _.bindAll(this, 'uploadImage');
  }

  uploadImage(event) {
    let formData = new FormData();
    formData.append('picture[product_id]', this.props.id);
    formData.append('picture[image]', event.target.files[0]);
    this.props.createPicture(formData);
  }
  render() {
    let { product, setProductErrors,
      productErrors, productLoading,
      updateProduct, setProduct,
      deletePicture, updatePicture } = this.props;
    let price = product.get('price');
    let title = product.get('title');
    let pictures = product.get('pictures');
    let productElem;

    if (productLoading) {
      productElem = <div className="loader"></div>
    } else {
      productElem =
        <div>
          <div>Добавить изобр:<input type='file' onChange={this.uploadImage}/></div>
          <hr/>
          <ImageList {...{pictures, deletePicture, updatePicture}}/>
          <hr/>
          <div className="form-horizontal">
            <Field
              field='title'
              label='Название'
              product={product}
              productErrors={productErrors}
              setProduct={setProduct}
              setProductErrors={setProductErrors}
              updateProduct={updateProduct} />
            <Field
              field='price'
              label='Цена'
              product={product}
              productErrors={productErrors}
              setProduct={setProduct}
              setProductErrors={setProductErrors}
              updateProduct={updateProduct} />
            <Field
              textarea={true}
              field='description'
              label='Описание'
              product={product}
              productErrors={productErrors}
              setProduct={setProduct}
              setProductErrors={setProductErrors}
              updateProduct={updateProduct} />
          </div>
        </div>
    }
    return (
      <div>
        {productElem}
      </div>
    );
  }
}
