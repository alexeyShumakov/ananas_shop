import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  'ADD_TO_CART', 'SET_SELECTED', 'RESET_SELECTED', 'SET_CART',
  'SET_CART_LOADING_STATE', 'SET_PRODUCTS',
  'SET_SHOWCASE_LOADING', 'SET_FILTERS', 'SET_FILTERS_LOADING'
]);

export default actionTypes;
