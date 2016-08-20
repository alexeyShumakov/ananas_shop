import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  'SET_CATEGORIES', 'SET_PRODUCT',
  'SET_PRODUCT_LOADING', 'SET_PRODUCT_ERRORS',
  'SET_FIELDS', 'SET_FIELD',
  'SET_FIELDS_VALUE', 'SET_BANNERS',
  'SET_ORDER', 'SET_ORDERS_STATUSES', 'SET_ORDERS_STATUS'
]);

export default actionTypes;
