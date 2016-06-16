// This file is our manifest of all reducers for the app.
// See also /client/app/bundles/HelloWorld/store/helloWorldStore.jsx
// A real world app will likely have many reducers and it helps to organize them in one file.
import cartReducer from './cartReducer';
import { $$initialState as $$cartState } from './cartReducer';
export default {
  $$cartStore: cartReducer
};

export const initialStates = {
  $$cartState
};
