import Immutable from 'immutable';

import actionTypes from '../constants/adminConstants';

export const $$initialState = Immutable.fromJS({
  test: 'test'
});

export default function adminReducer($$state = $$initialState, action) {
  const { type } = action;

  switch (type) {
    case(actionTypes.TEST):
      return $$state.set('test', 'new test');

    default:
      return $$state;
  }
}
