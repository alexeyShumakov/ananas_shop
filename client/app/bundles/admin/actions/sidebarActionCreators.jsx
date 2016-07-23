import actionTypes from '../constants/sidebarConstants';

export function setProduct(product) {
  return {
    type: actionTypes.SET_PRODUCT,
    product
  }
}
