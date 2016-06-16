import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  'ADD_TO_CART', 'UPDATE_CART', 'SET_SELECTED', 'RESET_SELECTED'
]);

export default actionTypes;
