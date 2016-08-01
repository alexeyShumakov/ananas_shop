import Immutable from 'immutable';

import actionTypes from '../constants/adminConstants';
import axios from '../utils/axios';

export function setProduct(product) {
  return {
    type: actionTypes.SET_PRODUCT,
    product
  }
}
export function setProductErrors(errors) {
  return {
    type: actionTypes.SET_PRODUCT_ERRORS,
    errors
  }
}
export function setProductLoading(loading) {
  return {
    type: actionTypes.SET_PRODUCT_LOADING,
    loading
  }
}

export function fetchProduct(id) {
  return dispatch => {
    dispatch(setProductLoading(true));
    return axios.get(`/api/v1/products/${id}`).then(
      responce => {
        let product = Immutable.fromJS(responce.data.product);
        dispatch(setProduct(product));
        dispatch(setProductLoading(false));
      });
  };
}

export function setFieldsValue(fieldsValue) {
  return {
    type: actionTypes.SET_FIELDS_VALUE,
    fieldsValue
  }
}

export function createFieldsValue(product_id, fields_value) {
  return dispatch => {
    return axios.post('/api/v1/fields_values', {fields_value, product_id}).then(
      responce => {
        let product = Immutable.fromJS(responce.data.product);
        dispatch(setProduct(product));
    });
  }
}

export function setFields(fields) {
  return {
    type: actionTypes.SET_FIELDS,
    fields
  }
}


export function setField(field) {
  return {
    type: actionTypes.SET_FIELD,
    field
  }
}

export function createField(field) {
  return dispatch => {
    return axios.post('/api/v1/fields', {field}).then(
      responce => {
    });
  }
}

export function fetchFields() {
  return dispatch => {
    return axios.get(`/api/v1/fields`).then(
      responce => {
        let fields = Immutable.fromJS(responce.data.fields);
        dispatch(setFields(fields));
      });
  };
}

export function createProductsField(products_field) {
  return dispatch => {
    return axios.post('/api/v1/products_fields', {products_field}).then(
      responce => {
        let product = Immutable.fromJS(responce.data.product);
        dispatch(setProduct(product));
    });
  }
}

export function deleteProductsField(id) {
  return dispatch => {
    return axios.delete(`/api/v1/products_fields/${id}`).then(
      responce => {
        let product = Immutable.fromJS(responce.data.product);
        dispatch(setProduct(product));
    });
  }
}

export function updateProductsField(id, products_field) {
  return dispatch => {
    return axios.put(`/api/v1/products_fields/${id}`, {products_field}).then(
      responce => {
        let product = Immutable.fromJS(responce.data.product);
        dispatch(setProduct(product));
    });
  }
}

export function updateProduct(id, product) {
  return dispatch => {
    return axios.put(`/api/v1/products/${id}`, {product}).then(
      responce => {
        let product = Immutable.fromJS(responce.data.product);
        dispatch(setProductErrors(Immutable.Map({})));
        dispatch(setProduct(product));
        return true;
      }, errors => {
        errors = Immutable.fromJS(errors.data);
        dispatch(setProductErrors(errors));
        return false;
      });
  };
}

export function createPicture(picture) {
  return dispatch => {
    return axios.post(`/api/v1/pictures`, picture).then(
      responce => {
        let product = Immutable.fromJS(responce.data.product);
        dispatch(setProduct(product));
      });
  };
}

export function updatePicture(id, picture) {
  return dispatch => {
    return axios.put(`/api/v1/pictures/${id}`, picture).then(
      responce => {
        let product = Immutable.fromJS(responce.data.product);
        dispatch(setProduct(product));
      });
  };
}

export function deletePicture(id) {
  return dispatch => {
    return axios.delete(`/api/v1/pictures/${id}`).then(
      responce => {
        let product = Immutable.fromJS(responce.data.product);
        dispatch(setProduct(product));
      });
  };
}

export function setCategories(categories) {
  return {
    type: actionTypes.SET_CATEGORIES,
    categories
  }
}

export function fetchCategories() {
  return dispatch => {
    return axios.get('/api/v1/categories').then(
      responce => {
        let categories = Immutable.fromJS(responce.data.categories);
        dispatch(setCategories(categories));
      });
  };
}
