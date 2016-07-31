import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  'SET_CATEGORIES', 'SET_PRODUCT',
  'SET_PRODUCT_LOADING', 'SET_PRODUCT_ERRORS',
  'SET_FIELDS'
]);

export default actionTypes;
