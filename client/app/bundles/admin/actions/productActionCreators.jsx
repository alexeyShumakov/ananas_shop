import Immutable from 'immutable';

import actionTypes from '../constants/adminConstants';
import axios from '../utils/axios';

export function test() {
  return {
    type: actionTypes.TEST
  }
}
