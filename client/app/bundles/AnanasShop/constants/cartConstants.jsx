import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  'ADD_TO_CART', 'SET_SELECTED', 'RESET_SELECTED', 'SET_CART', 'SET_ORDER',
  'SET_CART_LOADING_STATE', 'SET_PRODUCT', 'SET_PROFILE', 'SET_ADDRESS'
]);

export default actionTypes;
