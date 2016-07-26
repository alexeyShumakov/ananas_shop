import sidebarReducer from './sidebarReducer';
import { $$initialState as $$sidebarState } from './sidebarReducer';

import adminReducer from './adminReducer';
import { $$initialState as $$adminState } from './adminReducer';

export default {
  $$sidebarStore: sidebarReducer,
  $$adminStore: adminReducer
};

export const initialStates = {
  $$sidebarState, $$adminState
};
