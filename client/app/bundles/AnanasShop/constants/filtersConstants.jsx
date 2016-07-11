import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  'SET_FILTER', 'SET_FILTERS', 'SET_FILTERS_LOADING',
  'SET_PRODUCTS', 'SET_SHOWCASE_LOADING'
]);

export default actionTypes;
