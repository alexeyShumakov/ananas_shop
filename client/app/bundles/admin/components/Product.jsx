import React, { PropTypes } from 'react';
import Select from 'react-select';
import _ from 'lodash';
import Toggle from 'react-toggle';

import ImageList from './product/ImageList';
import Field from './product/Field';
import NewField from './product/NewField';
import CreateField from './product/CreateField';
import ProductsFields from './product/ProductsFields';

export default class Product extends React.Component {

  constructor(props, context) {
    super(props, context);
    props.actions.fetchProduct(props.id);
    props.actions.fetchCategories();
    this.state = {imageLoading: false};
    _.bindAll(this, 'uploadImage', 'setCategory', 'togglePublic', 'toggleExample');
  }

  setCategory(category) {
    let { updateProduct } = this.props.actions;
    let product = this.props.store.get('product');
    let value = category ? category.value : '';
    let newProductState = product.set('category_id', value);
    updateProduct(product.get('id'), newProductState);
  }

  togglePublic(e) {
    let { updateProduct } = this.props.actions;
    let product = this.props.store.get('product');
    let newPublic = !product.get('public');
    let newProductState = product.set('public', newPublic);
    updateProduct(product.get('id'), newProductState);
  }

  toggleExample(e) {
    let { updateProduct } = this.props.actions;
    let product = this.props.store.get('product');
    let newExample = !product.get('example');
    let newProductState = product.set('example', newExample);
    updateProduct(product.get('id'), newProductState);
  }

  uploadImage(event) {
    let _this = this;
    let formData = new FormData();
    formData.append('picture[product_id]', this.props.id);
    formData.append('picture[image]', event.target.files[0]);
    if (event.target.files[0]) {
      this.setState({imageLoading: true});
      this.props.actions.createPicture(formData).then(() => {
        _this.setState({imageLoading: false});
      })
    }
  }
  render() {
    let imageLoading;
    let { store, actions, id } = this.props;
    let product = store.get('product');
    let categories = store.get('categories');
    let fields = store.get('fields');
    let fieldsValue = store.get('fieldsValue');
    let productErrors = store.get('productErrors');
    let productLoading = store.get('productLoading');
    let {
      setProductErrors, updateProduct,
      setProduct, fetchFields,
      deletePicture, updatePicture,
      createProductsField, updateProductsField, deleteProductsField,
      createField, setField,
      setFieldsValue, createFieldsValue
    } = this.props.actions;
    let field = store.get('field');
    let price = product.get('price');
    let title = product.get('title');
    let isPublic = product.get('public');
    let forExample = product.get('example');
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
      let productsFields = product.get('products_fields');
      productElem =
        <div>
          <h4>Изображения</h4>
          <hr/>

          <div>
            Добавить изобр: {imageLoading}
            <input type='file' onChange={this.uploadImage}/>
          </div>
          <ImageList {...{pictures, deletePicture, updatePicture}}/>
          <h4>Параметры</h4>
          <hr/>

          <div className="form-horizontal">
            <div className="form-group">
              <label className="col-sm-2 control-label">Опубликовано</label>
              <div className="col-sm-10">
                <span className="admin-product__field-value">
                  <Toggle defaultChecked={isPublic} onChange={this.togglePublic} />
                </span>
              </div>
            </div>

            <div className="form-group">
              <label className="col-sm-2 control-label">Для примера</label>
              <div className="col-sm-10">
                <span className="admin-product__field-value">
                  <Toggle defaultChecked={forExample} onChange={this.toggleExample} />
                </span>
              </div>
            </div>

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
            <h4>Свойства
              <NewField {...{id, fields, fetchFields, createProductsField}}/>
              <CreateField {...{createField, setField, field}}/>
            </h4>
          <hr/>

          <ProductsFields {...{id,
            productsFields,
            fieldsValue,
            updateProductsField,
            deleteProductsField,
            setFieldsValue,
            createFieldsValue}}/>
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
