import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  'SET_FILTERS', 'SET_FILTERS_LOADING',
  'SET_PRICE_FILTER', 'SET_CATEGORY_ID',
  'SET_PRODUCTS', 'SET_SHOWCASE_LOADING'
]);

export default actionTypes;
