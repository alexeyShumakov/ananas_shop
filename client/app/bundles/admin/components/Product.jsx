import React, { PropTypes } from 'react';
import Select from 'react-select';
import _ from 'lodash';

import ImageList from './product/ImageList';
import Field from './product/Field';

export default class Sidebar extends React.Component {

  constructor(props, context) {
    super(props, context);
    props.fetchProduct(props.id);
    props.fetchCategories();
    this.state = {imageLoading: false};
    _.bindAll(this, 'uploadImage', 'setCategory');
  }

  setCategory(category) {
    let {updateProduct, product} = this.props;
    let value = category ? category.value : '';
    let newProductState = product.set('category_id', value);
    updateProduct(product.get('id'), newProductState);
  }

  uploadImage(event) {
    let _this = this;
    this.setState({imageLoading: true});
    let formData = new FormData();
    formData.append('picture[product_id]', this.props.id);
    formData.append('picture[image]', event.target.files[0]);
    this.props.createPicture(formData).then(() => {
      _this.setState({imageLoading: false});
    })
  }
  render() {
    let imageLoading;
    let { product, setProductErrors, categories,
      productErrors, productLoading,
      updateProduct, setProduct,
      deletePicture, updatePicture } = this.props;
    let price = product.get('price');
    let title = product.get('title');
    let pictures = product.get('pictures');
    let productElem;
    let options = categories.map( category => {
      return {value: category.get('id'), label: category.get('title')};
    }).toJS();

    if (this.state.imageLoading) {
      imageLoading = <b>Загрузка изображения...</b>
    }
    if (productLoading) {
      productElem = <div className="loader"></div>
    } else {
      let category = {
        value: product.getIn(['category', 'id']),
        label: product.getIn(['category', 'title'])
      }
      productElem =
        <div>
          <div>
            Добавить изобр: {imageLoading}
            <input type='file' onChange={this.uploadImage}/>
          </div>
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
            <div className="form-group">
              <label className="col-sm-2 control-label">Категория</label>
              <div className="col-sm-10">
                <Select
                  name="form-control"
                  clearable={false}
                  value={category}
                  options={options}
                  onChange={this.setCategory}
                />
              </div>
            </div>
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
