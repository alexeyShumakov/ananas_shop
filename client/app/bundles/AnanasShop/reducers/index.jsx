import cartReducer from './cartReducer';
import { $$initialState as $$cartState } from './cartReducer';

import filtersReducer from './filtersReducer'
import { $$initialState as $$filtersState } from './filtersReducer';


export default {
  $$cartStore: cartReducer,
  $$filtersStore: filtersReducer
};

export const initialStates = {
  $$cartState, $$filtersState
};
