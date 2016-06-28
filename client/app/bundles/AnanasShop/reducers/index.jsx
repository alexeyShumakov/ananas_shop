import cartReducer from './cartReducer';
import { $$initialState as $$cartState } from './cartReducer';

export default {
  $$cartStore: cartReducer
};

export const initialStates = {
  $$cartState
};
