import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  'ADD_TO_CART', 'SET_SELECTED', 'RESET_SELECTED', 'SET_CART'
]);

export default actionTypes;
